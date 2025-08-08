import random
import json
from datetime import datetime, timedelta
from faker import Faker
import requests
import time

fake = Faker('id_ID')  # Indonesian locale

API_URL = "http://localhost:3000/api/invoice"

def generate_invoice():
    today = datetime.today()
    invoice_date = today.date()
    issue_date = invoice_date
    due_date = invoice_date + timedelta(days=random.randint(7, 30))

    invoice_number = f"INVC/{invoice_date.strftime('%d%m%Y')}/{random.randint(100000000, 999999999)}"

    num_items = random.randint(1, 5)
    items = []
    total_amount = 0
    for _ in range(num_items):
        quantity = random.randint(1, 5)
        unit_price = random.randint(50, 500) * 1000
        line_total = quantity * unit_price
        total_amount += line_total

        items.append({
            "description": fake.word().title(),
            "quantity": quantity,
            "unitPrice": unit_price,
            "lineTotal": line_total
        })

    invoice = {
        "invoiceNumber": invoice_number,
        "invoiceDate": str(invoice_date),
        "clientName": random.choice([fake.company(), "PT Abil Jaya", "PT Athar Jaya", "PT Ado Jaya"]),
        "clientAddress": fake.address().replace("\n", ", "),
        "issueDate": str(issue_date),
        "dueDate": str(due_date),
        "totalAmount": total_amount,
        "items": items
    }

    return invoice

if __name__ == "__main__":
    for i in range(100):
        invoice = generate_invoice()
        try:
            res = requests.post(API_URL, json=invoice)
            print(f"[{i+1}/100] Status {res.status_code} - {res.text}")
        except requests.RequestException as e:
            print(f"[{i+1}/100] Error: {e}")
        time.sleep(0.05)

