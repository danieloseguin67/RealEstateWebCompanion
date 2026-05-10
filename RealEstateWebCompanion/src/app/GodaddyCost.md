Below is a realistic GoDaddy cost breakdown (CAD, 2026) for your exact architecture:

✅ WebCompanion (Angular admin)
✅ API service connected to SQL Server
✅ Montreal4Rent.com (Angular public site)
✅ Hosted on a GoDaddy private server (VPS)

All numbers are monthly unless noted and based on current GoDaddy Canada pricing.

1. Recommended GoDaddy Setup (Realistic & Sufficient)
✅ VPS Hosting (Core Requirement)
You need a VPS because:

You’re running an API
You may run SQL Server
You host two Angular apps
Shared hosting is not suitable

Recommended plan (minimum safe choice):

GoDaddy VPS – 2 vCPU / 4 GB RAM / 100 GB NVMe
Windows Server (for SQL Server & ASP.NET API)

💲 ~ $24.99 CAD / month (intro, 3‑year term)
🔁 Renews higher (typically ~$40–45 CAD/month)
 [godaddy.com]

⚠️ If you expect traffic or large listings/photos, jump to 4 vCPU / 8 GB RAM (~$49.99 CAD/mo).


2. SQL Server Cost
Option A – SQL Server Express (Most Common)

SQL Server Express
Free license
Limits:

10 GB per database
Enough for thousands of listings



💲 $0
✅ Recommended initially

Option B – SQL Server Standard (If You Grow)

SQL Server Standard (Windows)
License cost either:

Included at higher VPS tier
Or licensed separately



💲 $60–100+ CAD / month (if required later)
 [hostadvice.com]

3. SSL Certificates
You need SSL for:

montreal4rent.com
api.montreal4rent.com
webcompanion.montreal4rent.com

Best Practice

Use GoDaddy free SSL (1st year) OR
Use Let’s Encrypt (free, fully sufficient)

💲 $0–$6 / month average
Paid SSL is not required unless enterprise compliance is needed.
 [godaddy.com], [godaddy.com]

4. Domains & DNS

montreal4rent.com
Subdomains (api, webcompanion)

💲 ~ $20 CAD / year
→ ~ $1.67 / month
 [godaddy.com]

5. Backup & Monitoring (Optional but Smart)

Automated VPS backups
Snapshot retention

💲 $5–10 CAD / month
 [godaddy.com]

6. Total Monthly Cost (Realistic)
✅ Minimum Production Setup

































ItemMonthly Cost (CAD)VPS (2 vCPU / 4 GB)$24.99SQL Server Express$0SSL (free)$0Domains$1.67Backups$7TOTAL~ $34 / month

✅ Comfortable / Growth‑Ready Setup

































ItemMonthly Cost (CAD)VPS (4 vCPU / 8 GB)$49.99SQL Server Express$0SSL$0Domains$1.67Backups$10TOTAL~ $62 / month

7. One‑Line Executive Answer

Hosting Montreal4Rent.com with an Angular admin site, API, and SQL Server on GoDaddy costs approximately $35–$65 CAD per month, depending on VPS size and growth needs.


8. Important Reality Check (Professional Advice)

GoDaddy VPS works, but:

Renewal prices increase
Performance per dollar is not best-in-class


For long‑term scale:

OVHcloud (Canada)
Azure
DigitalOcean (Toronto)



…but if GoDaddy is required or already chosen, this setup is correct and safe.

If you want, I can:

Recommend exact VPS tier for your traffic projection
Compare GoDaddy vs OVH vs Azure costs
Provide migration‑ready architecture
Estimate cost at 10k / 100k / 1M listings