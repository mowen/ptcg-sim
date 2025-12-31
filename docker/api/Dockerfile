FROM python:3.14-slim

WORKDIR /app

COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY api .

CMD ["fastapi", "run", "app/main.py", "--port", "8000"]