# MAT282 Midterm package (Fall 2026): 40 points, 40 minutes

| File | Use |
|---|---|
| `MAT282_PRACTICE_Midterm` (.pdf/.docx) and `_KEY.pdf` | Practice, **pastry** sales. The key may be shared after the review. |
| `MAT282_Midterm_Version_A` (.pdf/.docx) and `_KEY.pdf` | Exam, Version A, **gelato** sales |
| `MAT282_Midterm_Version_B` (.pdf/.docx) and `_KEY.pdf` | Exam, Version B, **iced coffee** sales |

Each paper is 4 pages (A4); each key is 2 pages. Time: about 7, 10, 7, 10 and 3 minutes for Sections 1–5, plus 3 minutes to read and check.

## How the papers follow your teaching

- **LINEST:** your layout table (Col A = X₃ … Col D = intercept) is printed in every paper, so students read the output and do not memorise the columns. The fitted models have three predictors, matching your table.
- **Coefficients are interpreted, not tested.** Students write the equation, say what each coefficient means (units, “holding the others fixed”, association not cause, the intercept, R², SE − Y as the typical forecast error), calculate the effect of a stated change, and predict. They are **not** asked whether a coefficient is significant.
- **t-tests:** your three formulas (s, s_p, t, pooled) are printed exactly as you give them. Students work a 5 + 5 day price before/after worksheet, then **interpret** the `T.TEST` p-value (null hypothesis, significant or not at 5%, what p means, what it cannot show).
- **Model choices:** choose inputs with a direction and a reason, spot the input that is unusable before opening, decide what to do with two overlapping inputs, say how to check errors on unseen days.
- **Outliers:** impact on slope and R² from a figure and two small result tables (no z-scores).
- **Summary:** 3–4 sentences to the owner at the end.
- **Data:** the small datasets in Sections 3 and 4 are invented for the exam so the arithmetic is easy. The LINEST outputs (Table 3) are real fits to the 168-day workbook, so students can reproduce them.

## Sections and objectives

| Section | Pts | Min | What students do | Syllabus LO | Your category |
|---|---|---|---|---|---|
| 1 Choose the inputs | 8 | 7 | 1a three inputs with direction and reason (3) · 1b unusable input (2) · 1c overlapping inputs (2) · 1d check on unseen days (1) | 1, 5, 6 | Concept |
| 2 Read the LINEST output | 12 | 10 | 2a write the equation (2) · 2b repair three misreadings (3) · 2c effect of stated changes (3) · 2d predict, residual, compare with SE − Y (4) | 3, 5, 6, 7 | Computation, calculation, concept |
| 3 Errors and outliers | 8 | 7 | 3a residuals, MAE, a biased model (4) · 3b impact of one outlier (4) | 3, 4, 6 | Calculation, concept |
| 4 Did the price change sales? | 9 | 10 | 4a worksheet means, sums of squares, s (3) · 4b s_p and t (2) · 4c interpret `T.TEST` (3) · 4d another explanation (1) | 1, 3, 6 | Calculation, concept |
| 5 Summary for the owner | 3 | 3 | inputs and LINEST finding, price test, one caution | 7 | Concept |

## Versions and practice

Same sections, points and skills, with different data and different results:

| | Overlapping inputs (1c) | LINEST model (2) | Outlier (3b) | Price test (4) |
|---|---|---|---|---|
| Version A | temperature and sunshine (r = 0.78) | temperature, weekend, beach event | one day changes slope and R² a lot | gelato price rise, significant (p = 0.031) |
| Version B | temperature and sunshine (r = 0.78) | temperature, weekend, price | extreme but follows the pattern: little impact | iced coffee price cut, significant (p = 0.021); “after” days warmer |
| Practice | price and “new price period” flag (identical, r = 1.00) | temperature (negative), wind, weekend | spike changes R² but barely the slope | pastry price rise, **not** significant (p = 0.172) |

## Cut ladder (if you want it shorter)

Cut from the top of this list. Each cut also removes its time.

| Cut | Points | About | Why it is safe to cut |
|---|---|---|---|
| 1d check on unseen days | 1 | 1 min | Also appears in the practice discussion |
| 4d another explanation | 1 | 1 min | Part 4c already tests interpretation |
| 2c effect of stated changes | 3 | 3 min | 2a, 2b and 2d still test the LINEST output |
| 3a residuals and MAE | 4 | 4 min | Residuals still appear in 2d |

Cutting 1d, 4d and 2c gives **35 points, about 35 minutes**; also cutting 3a gives **31 points, about 31 minutes**. Tell me which you want and I will rebuild the papers, the section table and the keys together.

## Things to check

- **Formulas.** The papers use your pooled formulas and `=T.TEST(range1, range2, 2, 2)` (two-tailed, equal variances). The 5% rule for p is assumed, but critical values are not used.
- **Date and policy.** Your schedule and syllabus agree: review Oct 6, exam Oct 9. The price policy starts on 30 June itself, so the full data split is 84 days before and 84 after (earlier packages in this session used 85/83).
- **Verification.** The LINEST outputs, correlations, predictions, outlier results, t-tests and p-values were recomputed with independent code and checked against the PDFs (the p-values also by numerical integration). The Word files are built from the same content but **could not be opened in Word or LibreOffice here**: open one before editing and print from the PDFs.
