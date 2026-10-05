# MAT282 Midterm package (Fall 2026): 40 points, 40 minutes

| File | Use |
|---|---|
| `MAT282_PRACTICE_Midterm` (.pdf/.docx) and `_KEY.pdf` | Practice, **pastry** sales. The key may be shared after the review. |
| `MAT282_Midterm_Version_A` (.pdf/.docx) and `_KEY.pdf` | Exam, Version A, **gelato** sales |
| `MAT282_Midterm_Version_B` (.pdf/.docx) and `_KEY.pdf` | Exam, Version B, **iced coffee** sales |

Each paper is 4 pages (A4) and each key 2 pages. Time: about 7, 10, 7, 10 and 3 minutes for Sections 1–5, plus 3 minutes to read and check.

## What changed after your feedback

- **Shorter and simpler:** 40 points, 40 minutes, 4 pages (the last package was 50 points, 55 minutes, 8 pages).
- **Removed:** z-scores, validity and reliability, the correlation matrix, adjusted R², r² between predictors, the hold-out table and the baseline forecast.
- **LINEST:** your layout table (Col A = X₃ … Col D = intercept) is printed in every paper, so students read the output and do not memorise the columns.
- **t-tests:** a small before/after price dataset (5 + 5 days). Students compute s, s_p and t from the formulas printed on the paper, then **interpret** the `T.TEST` p-value (null hypothesis, significance, what p means, what it cannot say).
- **Small constructed data:** the data in Sections 3 and 4 are invented for the exam (not taken from the workbook) so that the arithmetic is easy and each point is clear. The LINEST outputs (Table 3) are real fits to the 168-day workbook, so students can reproduce them.
- **Kept:** model choices, outlier impact, a summary for the owner at the end.

## Sections and objectives

| Section | Pts | Min | What students do | Syllabus LO | Your category |
|---|---|---|---|---|---|
| 1 Choose the inputs | 8 | 7 | Choose three inputs with a direction and a reason; spot the unusable input; decide what to do with two overlapping inputs; say how to check errors on unseen days | 1, 5, 6 | Concept |
| 2 Read the LINEST output | 12 | 10 | Write the fitted equation from the layout table; repair three misread statements; use the “2 standard errors” rule to find the weak predictor; predict and give a rough range with SE − Y | 5, 6, 7 | Computation, calculation, concept |
| 3 Errors and outliers | 8 | 7 | Fill in residuals and calculate MAE; compare with a biased model; identify the impact of one outlier on slope and R² from a figure and two small result tables (no z-scores) | 3, 4, 6 | Calculation, concept |
| 4 Did the price change sales? | 9 | 10 | Worksheet for means, sums of squares and s; calculate s_p and t; interpret `T.TEST`; name another explanation | 1, 3, 6 | Calculation, concept |
| 5 Summary for the owner | 3 | 3 | 3–4 sentences: inputs and main LINEST finding, price test result, one caution | 7 | Concept |

## Versions and practice

Same sections, points and skills, with different data and different results:

| | Overlapping inputs | LINEST model | Outlier day | Price test |
|---|---|---|---|---|
| Version A | temperature and sunshine (r = 0.78) | temperature, sunshine, beach event | one day changes the slope and R² a lot (investigate, delete only with a reason) | gelato price rise, significant (p = 0.031) |
| Version B | temperature and sunshine (r = 0.78) | temperature, sunshine (negative sign, tiny), weekend | extreme but follows the pattern: little impact, keep | iced coffee price cut, significant (p = 0.021), warmer “after” days |
| Practice | price and “new price period” flag (identical, r = 1.00) | temperature (negative), wind (borderline), weekend | spike changes R² but barely the slope | pastry price rise, **not** significant (p = 0.172) |

## Things to check

- **t-test method.** The papers use the **pooled** formula (s_p) and `=T.TEST(range1, range2, 2, 2)` (two-tailed, equal variances), with the critical value 2.31 for df = 8 printed. If your course uses unequal variances or one-tailed tests, tell me and I will change the formulas and the key together.
- **Rule of thumb.** “Clearly different from zero if more than 2 standard errors away” (Section 2). If you prefer t = coefficient ÷ SE with a p-value, I can switch it.
- **Time.** If a class needs less, drop Section 3a (4 points, about 4 minutes), then Question 1d.
- **Date and policy.** Your schedule and syllabus agree: review Oct 6, exam Oct 9. The price policy starts on 30 June itself, so the full data split is 84 days before and 84 after (earlier packages in this session used 85/83).
- **Verification.** The LINEST outputs, correlations, predictions, outlier results, t-tests and p-values were recomputed with independent code and checked against the PDFs (the p-values also by numerical integration). The Word files are built from the same content but **could not be opened in Word or LibreOffice here**: open one before editing and print from the PDFs.
