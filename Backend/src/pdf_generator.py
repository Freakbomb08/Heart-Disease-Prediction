from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet
import matplotlib.pyplot as plt
import uuid
import datetime
import os

def generate_chart(probabilities, chart_path):
    labels = list(probabilities.keys())
    values = list(probabilities.values())

    plt.figure(figsize=(6, 4))
    plt.bar(labels, values)
    plt.title("Risk Probability Chart")
    plt.ylabel("Probability")
    plt.xlabel("Risk Type")
    plt.tight_layout()

    os.makedirs(os.path.dirname(chart_path), exist_ok=True)
    
    plt.savefig(chart_path)
    plt.close()

def generate_report(patient_data, presence_res, failure_res, output_path="reports/"):

    report_id = str(uuid.uuid4())[:8]
    filename = f"Heart_Report_{report_id}.pdf"
    full_path = os.path.join(output_path, filename)

    if not os.path.exists(output_path):
        os.makedirs(output_path)
    
    doc = SimpleDocTemplate(full_path, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []
    story.append(Paragraph("<b>Heart Disease Prediction Report</b>", styles["Title"]))
    story.append(Spacer(1, 12))
    story.append(Paragraph(f"Report ID: {report_id}", styles["Normal"]))
    story.append(Paragraph(f"Date: {datetime.date.today()}", styles["Normal"]))
    story.append(Spacer(1, 12))
    story.append(Paragraph("<b>Patient Details:</b>", styles["Heading2"]))
    for k, v in patient_data.items():
        story.append(Paragraph(f"{k.capitalize()}: {v}", styles["Normal"]))
    story.append(Spacer(1, 12))
    story.append(Paragraph("<b>Prediction Summary:</b>", styles["Heading2"]))
    story.append(Paragraph(f"Heart Disease Presence: {presence_res['label']}", styles["Normal"]))
    story.append(Paragraph(f"Confidence: {presence_res['probability']*100:.2f}%", styles["Normal"]))
    story.append(Spacer(1, 10))
    story.append(Paragraph(f"Heart Failure Risk: {failure_res['failure_risk']*100:.2f}%", styles["Normal"]))
    story.append(Paragraph(f"Final Risk Level: <b>{failure_res['risk_level']}</b>", styles["Normal"]))
    story.append(Spacer(1, 20))
    chart_path = f"static/charts/chart_{report_id}.png"
    generate_chart({
        "Presence": presence_res["probability"],
        "Heart Failure": failure_res["failure_risk"],
    }, chart_path)
    story.append(Paragraph("<b>Risk Analysis Chart:</b>", styles["Heading2"]))
    story.append(Image(chart_path, width=400, height=300))
    story.append(Spacer(1, 12))
    story.append(Paragraph("<b>Recommendations:</b>", styles["Heading2"]))
    risk = failure_res["risk_level"].lower()
    if risk == "low":
        rec = [
            "Maintain a healthy lifestyle",
            "Regular exercise (30 min/day)",
            "Monitor vitals every 6 months"
        ]
    elif risk == "moderate":
        rec = [
            "Consult a doctor within 1 month",
            "Monitor BP and cholesterol regularly",
            "Avoid smoking & reduce salt intake"
        ]
    else:
        rec = [
            "Immediate cardiologist consultation required",
            "Follow emergency care guidelines",
            "Stress test and ECG advised"
        ]
    for r in rec:
        story.append(Paragraph(f"- {r}", styles["Normal"]))
    doc.build(story)
    return full_path
