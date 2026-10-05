# MAT282 Midterm package (Fall 2026): 40 points, 40 minutes

A practice midterm and two exam versions, each with a key. Built from the syllabus learning outcomes (LOs), the schedule (material through the Oct 2 assignments; review Oct 6, exam Fri Oct 9) and the café dataset.

| File | Use |
|---|---|
| `MAT282_PRACTICE_Midterm` (.pdf/.docx) and `_KEY` | Practice, **pastry** sales. The key may be shared after the review. |
| `MAT282_Midterm_Version_A` (.pdf/.docx) and `_KEY` | Exam, Version A, **gelato** sales |
| `MAT282_Midterm_Version_B` (.pdf/.docx) and `_KEY` | Exam, Version B, **iced coffee** sales |

Each paper is 4 pages (A4); each key is 2 pages. Print from the PDFs.

## Structure: your three categories

| Part | Pts | Min | Category | What students do |
|---|---|---|---|---|
| 1 Concepts: model choices and interpretation | 24 | 21 | Concepts, critical thinking | Q1 choose the inputs (7) · **Q2 interpret the coefficients (14)** · Q3 outliers (3) |
| 2 Calculations by hand | 5 | 7 | Calculations | **Exam: the t-test.** Worksheet of means, Σ(x − x̄)² and s (3), then s_p and t (2). **Practice: the standard deviation.** Same worksheet (3), then which group is more spread out and why a larger s makes a difference between means harder to detect (2) |
| 3 Computations in Sheets | 8 | 6 | Computations | 5a write STDEV.S, T.TEST and LINEST (3) · 5b what the T.TEST and LINEST arguments mean (2) · 5c interpret the T.TEST p-value (3) |
| Summary for the owner | 3 | 3 | Communication | Q6: 3–4 sentences for a reader with no statistics |

The time split (21 + 7 + 6 + 3, plus 3 to read and check) is printed on every paper. The key tags each question with its LO and category (Con, Cal, Com).

## Q2: interpreting the coefficients (14 of 40 points)

Students get your LINEST layout table (Table 2) beside the output (Table 3), so they do not memorise the columns. They interpret the coefficients; they are **not** asked whether a coefficient is significant.

| Item | Pts | What it checks |
|---|---|---|
| 2a | 2 | Reads the equation off the layout table (Col A is the last X, Col D the intercept) |
| 2b | 3 | “A 1-unit increase in X₁ leads to what in y”, with units, and **what is held constant**; why we say “holding the other variables constant” |
| 2c | 3 | Sign: what a negative (or positive) coefficient means in context; a 0/1 variable against its comparison group; a coefficient for too small or too large a step (€1, 1 km/h) rewritten for a sensible step (€0.10, 10 km/h) |
| 2d | 3 | Rescales temperature to 10 °C; which unit gives the better message for the owner; why comparing raw coefficients on different scales is unfair |
| 2e | 3 | Predicts for a forecast day, then the effect of a stated change (a €0.20 price rise in A and B, 10 km/h more wind in the practice), everything else the same |

The Summary (Q6) asks for the same skill in plain words: one input, a sensible change, “holding the others constant”.

## Versions and practice

| | Overlapping inputs (1c) | Q2 model (X₁, X₂, X₃) | Outlier (Q3) | Price test (Q4, 5c) |
|---|---|---|---|---|
| **A** gelato | temperature and sunshine, r = 0.78 | temperature, beach event, gelato price (R² 0.53) | Day 8 changes the slope (2.49 → 6.29) and R² (0.17 → 0.97) | price raised €4.00 → €4.50; means 200 vs 186; t = 2.61, p = 0.031, significant |
| **B** iced coffee | temperature and sunshine, r = 0.78 | temperature, weekend, iced coffee price (R² 0.67) | Day 8 is extreme but on the line: little impact (slope 4.41 → 4.25) | price cut €3.50 → €3.10; means 100 vs 114; t = −2.86, p = 0.021, significant; “after” days 4 °C warmer, which is the caution for the Summary |
| **Practice** pastry | price and the “new price period” flag, r = 1.00 | temperature (negative), wind, weekend (R² 0.33) | Day 4 is a spike: slope barely changes (−1.14 → −0.98), R² jumps (0.26 → 0.96) | price raised €2.50 → €2.75; means 66 vs 63; s = 3.16 vs 4.90; p = 0.283, **not** significant (not evidence of no effect) |

- Q1: one candidate is unusable because it is only known after closing (A: iced coffee sales, B: iced coffee revenue, practice: gelato sales). The three inputs fitted in Q2 are ones a good Q1 answer would choose, so Q1 and Q2 tell one story.
- The LINEST outputs (Table 3) are real fits to the 168-day workbook. The 8-day outlier data and the 5 + 5 day price data are small constructed examples.

## Cut ladder (if you want it shorter)

Each cut stands alone. Items on your priority list (model choices, interpretation, outliers, t by hand, the p-value, the summary) go last.

| Cut | Points | About | Why it is the safest |
|---|---|---|---|
| 5b: what the last two T.TEST numbers and the second LINEST TRUE mean | 2 | 1.5 min | 5a already tests that students can write the functions |
| 2e(ii): effect of the stated change | 1 | 1 min | 2e(i) keeps the prediction; 2c(iii) and 2d keep the rescaling |
| Q3 outliers (all) or 1c overlapping inputs | 3 or 2 | 3 or 2 min | Both are on your priority list, so cut them last |

Cutting 5b and 2e(ii) gives **37 points, about 37–38 minutes**; also cutting Q3 gives **34 points, about 34–35 minutes**. Tell me which you want and I will rebuild the papers, the part table and the keys together.

## Things to check

- **Not timed with students.** The per-question minutes are my estimates; a stopwatch read-through as a student is the best test.
- **Residuals are not examined** in this version (R² appears in Q3b, SE − Y in the printed output). If you want one, the cleanest swap is a residual question (actual − predicted for one day) in place of 2e(ii), at the same time cost.
- **Left out on purpose:** whether coefficients are significant (standard errors, the 2-SE rule), z-scores, histograms and box plots, validity and reliability, checks on unseen days.
- **Formulas.** The three formulas are your images (the practice prints only s). Tests use `=T.TEST(range1, range2, 2, 2)` (two-tailed, equal variances) and the 5% rule. Q5 names two sheets (“Price test”, “Daily data”) so the cell ranges do not overlap.
- **Dates and data.** Schedule and syllabus agree: review Oct 6, exam Oct 9. The price policy starts on 30 June itself, so the 168 days split 84 before and 84 after (earlier packages in this session used 85/83).
- **Verification.** The LINEST outputs, correlations, predictions, rescaled coefficients, outlier results, s, s_p, t and p-values (also by numerical integration) were recomputed with independent code: 56 checks, 0 failures. The Word files are built from the same content but **could not be opened in Word or LibreOffice here** (only their XML was checked), so open one before editing; page breaks may differ from the PDFs.
