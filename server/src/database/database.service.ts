import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: Pool;

  onModuleInit() {
    dotenv.config();
    // Initialize the PostgreSQL connection pool
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT
        ? Number(process.env.POSTGRES_PORT)
        : 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    this.pool.query(
      `
      CREATE TABLE IF NOT EXISTS Todo (
        id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `,
      (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Todo table created or already exists.');
        }
      },
    );
  }

  // Query execution using pool for PostgreSQL
  run(sql: string, params: any[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err: Error) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  // Fetch a single row using pool.query
  get(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err: Error, result) => {
        if (err) reject(err);
        else resolve(result.rows[0]); // PostgreSQL returns rows in result.rows
      });
    });
  }

  // Fetch all rows using pool.query
  all(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err: Error, result) => {
        if (err) reject(err);
        else resolve(result.rows);
      });
    });
  }

  // Close the PostgreSQL connection pool
  close() {
    this.pool
      .end()
      .then(() => {
        console.log('Closed the PostgreSQL database connection.');
      })
      .catch((err) => {
        console.error('Error closing the database connection:', err.message);
      });
  }
}

// import { Injectable, OnModuleInit } from '@nestjs/common';
// import * as sqlite3 from 'sqlite3';
//
// @Injectable()
// export class DatabaseService implements OnModuleInit {
//   private db: sqlite3.Database;
//
//   onModuleInit() {
//     this.db = new sqlite3.Database('./database.db', (err) => {
//       if (err) {
//         console.error('Error opening database:', err.message);
//       } else {
//         console.log('Connected to the SQLite database.');
//       }
//     });
//
//     this.db.run(
//       `
//       CREATE TABLE IF NOT EXISTS Todo (
//         id TEXT PRIMARY KEY,
//         title TEXT NOT NULL,
//         description TEXT,
//         status TEXT DEFAULT 'pending',
//         createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
//         updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
//       );
//     `,
//       (err: Error | null) => {
//         if (err) {
//           console.error('Error creating table:', err.message);
//         } else {
//           console.log('Todo table created or already exists.');
//         }
//       },
//     );
//   }
//
//   run(sql: string, params: any[] = []): Promise<void> {
//     return new Promise((resolve, reject) => {
//       this.db.run(sql, params, function (err) {
//         if (err) reject(err);
//         else resolve();
//       });
//     });
//   }
//
//   get(sql: string, params: any[] = []): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.db.get(sql, params, (err, row) => {
//         if (err) reject(err);
//         else resolve(row);
//       });
//     });
//   }
//
//   all(sql: string, params: any[] = []): Promise<any[]> {
//     return new Promise((resolve, reject) => {
//       this.db.all(sql, params, (err, rows) => {
//         if (err) reject(err);
//         else resolve(rows);
//       });
//     });
//   }
//
//   close() {
//     this.db.close((err) => {
//       if (err) {
//         console.error('Error closing the database:', err.message);
//       } else {
//         console.log('Closed the SQLite database connection.');
//       }
//     });
//   }
// }
