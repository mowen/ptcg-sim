FROM python:3.14-slim

WORKDIR /app

COPY pyproject.toml .
RUN pip install --no-cache-dir -e .
COPY api .

CMD ["fastapi", "run", "app/main.py", "--port", "8000"]
