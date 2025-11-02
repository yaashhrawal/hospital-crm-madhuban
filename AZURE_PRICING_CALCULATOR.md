# Azure Pricing Calculator for Hospital CRM Pro
## Quick Reference Guide

---

## 🧮 Interactive Pricing Tool

**Use this guide to calculate costs for different scenarios**

---

## 1. App Service Pricing

### Linux App Service Plans (India Central Region)

| Tier | SKU | vCores | RAM | Storage | Auto-Scale | Price/Month (INR) | Price/Month (USD) |
|------|-----|--------|-----|---------|------------|-------------------|-------------------|
| **Free** | F1 | Shared | 1 GB | 1 GB | No | ₹0 | $0 |
| **Basic** | B1 | 1 | 1.75 GB | 10 GB | No | ₹1,344 | $16.14 |
| **Basic** | B2 | 2 | 3.5 GB | 10 GB | No | ₹2,688 | $32.28 |
| **Standard** | S1 | 1 | 1.75 GB | 50 GB | Yes | ₹2,688 | $32.28 |
| **Standard** | S2 | 2 | 3.5 GB | 50 GB | Yes | ₹5,376 | $64.56 |
| **Premium** | P1v2 | 1 | 3.5 GB | 250 GB | Yes | ₹7,560 | $90.72 |
| **Premium** | P2v2 | 2 | 7 GB | 250 GB | Yes | ₹15,120 | $181.44 |

**Our Recommendation:** Standard S1 (₹2,688/month)

---

## 2. Azure Database for PostgreSQL - Flexible Server Pricing

### Burstable Tier (Development/Small Production)

| SKU | vCores | RAM | Price/Hour (INR) | Price/Month (INR) | Price/Month (USD) |
|-----|--------|-----|------------------|-------------------|-------------------|
| B1ms | 1 | 2 GB | ₹2.31 | ₹1,680 | $20.16 |
| B2s | 2 | 4 GB | ₹4.62 | ₹3,360 | $40.32 |

### General Purpose Tier (Production)

| SKU | vCores | RAM | Price/Hour (INR) | Price/Month (INR) | Price/Month (USD) |
|-----|--------|-----|------------------|-------------------|-------------------|
| D2s_v3 | 2 | 8 GB | ₹8.82 | ₹6,419 | $77.03 |
| **D2ds_v4** ⭐ | 2 | 8 GB | ₹11.55 | ₹8,400 | $100.80 |
| D4s_v3 | 4 | 16 GB | ₹17.64 | ₹12,838 | $154.06 |
| D4ds_v4 | 4 | 16 GB | ₹23.10 | ₹16,800 | $201.60 |
| D8s_v3 | 8 | 32 GB | ₹35.28 | ₹25,676 | $308.12 |

**Our Recommendation:** D2ds_v4 (₹8,400/month)

### Storage Pricing

| Item | Price (INR/GB/month) | Price (USD/GB/month) |
|------|---------------------|---------------------|
| **Provisioned Storage** | ₹5.25 | $0.063 |
| **Backup Storage** | ₹2.10 | $0.025 |

**Calculation Examples:**
- 32 GB storage: ₹168/month ($2.02)
- 64 GB storage: ₹336/month ($4.03)
- 128 GB storage: ₹672/month ($8.06)
- 256 GB storage: ₹1,344/month ($16.13)

### High Availability (Optional Add-on)

| Configuration | Additional Cost | Total Cost for D2ds_v4 |
|--------------|-----------------|------------------------|
| **Without HA** | ₹0 | ₹8,400/month |
| **With Zone Redundancy** | +100% | ₹16,800/month |

---

## 3. Azure Blob Storage Pricing

### Storage Tiers

| Tier | Use Case | Price (INR/GB/month) | Price (USD/GB/month) |
|------|----------|---------------------|---------------------|
| **Hot** | Frequent access | ₹1.57 | $0.0188 |
| **Cool** | Infrequent access (30+ days) | ₹0.84 | $0.0101 |
| **Archive** | Rare access (180+ days) | ₹0.17 | $0.0020 |

### Transaction Pricing

| Operation Type | Hot Tier (per 10k) | Cool Tier (per 10k) |
|----------------|-------------------|---------------------|
| Write Operations | ₹4.20 | ₹8.40 |
| Read Operations | ₹0.36 | ₹0.84 |
| Other Operations | ₹0.36 | ₹0.36 |

**Backup Storage Estimate:**
- Daily backup (compressed): ~500 MB
- 7 days retention: ~3.5 GB
- 30 days retention: ~15 GB
- Monthly cost (7 days): ₹55 ($0.66)
- Monthly cost (30 days): ₹236 ($2.83)

---

## 4. Additional Services Pricing

### Application Insights (Monitoring)

| Tier | Data Ingestion | Price (INR/GB) | Monthly Cost |
|------|----------------|----------------|--------------|
| **Free** | 5 GB/month | ₹0 | ₹0 |
| **Pay-as-you-go** | >5 GB | ₹168/GB | Varies |

**Typical Usage:**
- Small app: 2-3 GB/month (Free)
- Medium app: 5-10 GB/month (₹840/month)
- Large app: 20+ GB/month (₹2,520/month)

### Azure Key Vault

| Item | Price |
|------|-------|
| Secrets (per 10k operations) | ₹0.26 |
| Keys (per 10k operations) | ₹2.63 |
| Certificates | ₹26.25/month each |

**Typical Monthly Cost:** ₹315 (~$3.78)

### Azure CDN (Optional)

| Tier | Price (first 10 TB/month) |
|------|--------------------------|
| Standard Microsoft | ₹6.30/GB |
| Standard Verizon | ₹11.30/GB |
| Premium Verizon | ₹16.80/GB |

**50 GB/month CDN:** ₹315 - ₹840 ($3.78 - $10.08)

---

## 5. Cost Calculator Templates

### Template 1: Budget Setup
```
App Service (Basic B1):           ₹1,344
PostgreSQL (B1ms + 32GB):         ₹1,848
Blob Storage (5 GB):              ₹100
Application Insights (Free):      ₹0
                                  -------
SUBTOTAL:                         ₹3,292
GST (18%):                        ₹593
TOTAL:                            ₹3,885/month
```

### Template 2: Recommended Setup ⭐
```
App Service (Standard S1):        ₹2,688
PostgreSQL (D2ds_v4 + 64GB):      ₹8,736
Blob Storage (10 GB):             ₹157
Application Insights (Free):      ₹0
                                  -------
SUBTOTAL:                         ₹11,581
GST (18%):                        ₹2,085
TOTAL:                            ₹13,666/month
```

### Template 3: High Availability Setup
```
App Service (Standard S1):        ₹2,688
PostgreSQL (D2ds_v4 + HA):        ₹16,800
PostgreSQL Storage (128GB):       ₹672
Blob Storage (20 GB):             ₹314
Application Insights (10 GB):     ₹1,680
Azure Key Vault:                  ₹315
CDN (50 GB):                      ₹630
                                  -------
SUBTOTAL:                         ₹23,099
GST (18%):                        ₹4,158
TOTAL:                            ₹27,257/month
```

---

## 6. Scaling Cost Calculator

### If You Need to Scale Up

**From Recommended (D2ds_v4) to D4ds_v4:**
- Current: ₹8,400/month
- New: ₹16,800/month
- Difference: +₹8,400/month

**From Recommended (D2ds_v4) to D8s_v3:**
- Current: ₹8,400/month
- New: ₹25,676/month
- Difference: +₹17,276/month

### Storage Scaling

**Current: 64 GB → Scale to 128 GB:**
- Additional: 64 GB × ₹5.25 = ₹336/month

**Current: 64 GB → Scale to 256 GB:**
- Additional: 192 GB × ₹5.25 = ₹1,008/month

---

## 7. Data Transfer Pricing

### Within Azure (Same Region)
- **FREE** (No charge for data transfer within India Central)

### Outbound Data Transfer (Internet)

| Volume | Price (INR/GB) | Price (USD/GB) |
|--------|---------------|----------------|
| First 100 GB/month | ₹0 (FREE) | $0 |
| 100 GB - 10 TB | ₹7.14 | $0.0856 |
| 10 TB - 50 TB | ₹5.67 | $0.0680 |
| 50 TB - 500 TB | ₹4.62 | $0.0554 |

**Typical Hospital CRM Usage:** <50 GB/month = FREE

---

## 8. Cost Saving Strategies

### Reserved Instances (1-Year Commitment)

| Service | Pay-as-you-go | 1-Year Reserved | Savings |
|---------|--------------|-----------------|---------|
| App Service S1 | ₹2,688/mo | ₹1,881/mo | 30% |
| PostgreSQL D2ds_v4 | ₹8,400/mo | ₹5,880/mo | 30% |
| **Total Monthly** | ₹11,088 | ₹7,761 | **₹3,327/mo** |

**Annual Savings:** ₹39,924 (~$479)

### Dev/Test Pricing

**Eligible if used for development/testing only:**
- App Service: 25% discount
- Database: 55% discount

**Example:** D2ds_v4
- Regular: ₹8,400/month
- Dev/Test: ₹3,780/month
- Savings: ₹4,620/month

---

## 9. Custom Configuration Builder

**Use this worksheet to calculate your custom setup:**

### Step 1: Choose App Service
- [ ] Basic B1 (₹1,344)
- [ ] Standard S1 (₹2,688) ⭐
- [ ] Premium P1v2 (₹7,560)

**Your Choice:** _____ = ₹_______

### Step 2: Choose Database
- [ ] B1ms - 1 vCore, 2GB (₹1,680)
- [ ] D2ds_v4 - 2 vCore, 8GB (₹8,400) ⭐
- [ ] D4ds_v4 - 4 vCore, 16GB (₹16,800)

**Your Choice:** _____ = ₹_______

### Step 3: Choose Storage
- Storage GB: _____ × ₹5.25 = ₹_______
- Backup GB: _____ × ₹2.10 = ₹_______

### Step 4: Optional Services
- [ ] Application Insights: ₹_______
- [ ] Azure Key Vault: ₹315
- [ ] CDN: ₹_______
- [ ] High Availability (+100% DB cost): ₹_______

### Your Total Calculation:
```
App Service:                ₹_______
Database:                   ₹_______
Storage:                    ₹_______
Optional Services:          ₹_______
                           ---------
SUBTOTAL:                   ₹_______
GST (18%):                  ₹_______
                           ---------
MONTHLY TOTAL:              ₹_______
ANNUAL TOTAL (×12):         ₹_______
```

---

## 10. Quick Cost Estimates by User Load

### Light Usage (100-500 concurrent users)
**Recommended:** Budget Configuration
- **Monthly:** ₹3,686 ($44)
- **Annual:** ₹44,232 ($531)

### Medium Usage (500-2000 concurrent users)
**Recommended:** Standard Configuration ⭐
- **Monthly:** ₹13,320 ($160)
- **Annual:** ₹159,840 ($1,918)

### Heavy Usage (2000-5000 concurrent users)
**Recommended:** Enhanced Configuration
- **Monthly:** ₹27,257 ($327)
- **Annual:** ₹327,084 ($3,925)

### Very Heavy Usage (5000+ concurrent users)
**Recommended:** Enterprise + Auto-scaling
- **Monthly:** ₹35,000+ ($420+)
- **Annual:** ₹420,000+ ($5,040+)

---

## 11. ROI Calculator

### Current Costs (Hybrid Setup)
```
Azure App Service:               $32/month
Supabase Pro:                    $25/month
Azure PostgreSQL (partial):      $20/month
Developer time (debugging):      $240/month (12 hours)
                                 -----------
TOTAL CURRENT COST:              $317/month
```

### Proposed Costs (Azure Only - Recommended)
```
Complete Azure Setup:            $160/month
Developer time (minimal):        $40/month (2 hours)
                                 -----------
TOTAL PROPOSED COST:             $200/month
```

### Monthly Savings: $117
### Annual Savings: $1,404

**ROI:** Migration cost recovered in 2-3 months

---

## 12. Migration Cost Estimate

### One-Time Migration Costs

| Item | Hours | Rate/Hour | Cost |
|------|-------|-----------|------|
| Setup Azure Services | 4 | ₹2,000 | ₹8,000 |
| Data Migration Scripts | 8 | ₹2,000 | ₹16,000 |
| Data Migration Execution | 4 | ₹2,000 | ₹8,000 |
| Application Updates | 8 | ₹2,000 | ₹16,000 |
| Testing & QA | 12 | ₹2,000 | ₹24,000 |
| Documentation | 4 | ₹2,000 | ₹8,000 |
| **TOTAL MIGRATION** | **40 hours** | | **₹80,000 (~$960)** |

**Payback Period:** 6 months (based on monthly savings)

---

## 13. Long-term Cost Projection (3 Years)

### Scenario 1: Budget Configuration
```
Year 1:  ₹3,686 × 12 = ₹44,232
Year 2:  ₹3,870 × 12 = ₹46,440 (5% growth)
Year 3:  ₹4,064 × 12 = ₹48,768 (5% growth)
                       ---------
3-YEAR TOTAL:          ₹139,440 (~$1,673)
```

### Scenario 2: Recommended Configuration (with Reserved Instances)
```
Year 1:  ₹7,761 × 12 = ₹93,132 (Reserved)
Year 2:  ₹8,149 × 12 = ₹97,788 (Reserved, 5% growth)
Year 3:  ₹8,557 × 12 = ₹102,684 (Reserved, 5% growth)
                       ---------
3-YEAR TOTAL:          ₹293,604 (~$3,523)
```

### Scenario 3: High Availability Configuration
```
Year 1:  ₹27,257 × 12 = ₹327,084
Year 2:  ₹28,620 × 12 = ₹343,440 (5% growth)
Year 3:  ₹30,051 × 12 = ₹360,612 (5% growth)
                        ---------
3-YEAR TOTAL:           ₹1,031,136 (~$12,374)
```

---

## 14. Cost Alerts & Monitoring

### Recommended Budget Alerts

**Set up Azure Cost Management alerts at:**
- 50% of monthly budget: Early warning
- 75% of monthly budget: Review required
- 90% of monthly budget: Immediate action
- 100% of monthly budget: Auto-alert to admin

**Example for Recommended Plan (₹13,320/month):**
- Alert 1: ₹6,660 (50%)
- Alert 2: ₹9,990 (75%)
- Alert 3: ₹11,988 (90%)
- Alert 4: ₹13,320 (100%)

---

## 15. Quick Reference: Azure Services

### All Pricing Links (Official Azure Pricing)
- App Service: https://azure.microsoft.com/en-in/pricing/details/app-service/
- PostgreSQL: https://azure.microsoft.com/en-in/pricing/details/postgresql/
- Blob Storage: https://azure.microsoft.com/en-in/pricing/details/storage/blobs/
- Application Insights: https://azure.microsoft.com/en-in/pricing/details/monitor/
- Azure Calculator: https://azure.microsoft.com/en-in/pricing/calculator/

---

**Last Updated:** January 2025
**Currency:** 1 USD = ₹83.33 INR (approximate)
**Region:** India Central
**GST:** 18% applicable on all services

---

**Note:** Prices are subject to change. Use official Azure Pricing Calculator for most accurate quotes.
