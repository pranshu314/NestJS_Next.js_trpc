.PHONY: run_server
run_server:
	cd server && npm install && npm run dev

.PHONY: run_web
run_web:
	cd web_client && npm install && npx next dev
