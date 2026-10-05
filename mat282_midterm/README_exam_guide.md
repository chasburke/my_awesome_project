# MAT282 Midterm package (Fall 2026)

Files (A4, print from the PDFs; 50 points each, ~45 min):

| File | Use |
|---|---|
| `MAT282_Practice_Midterm.pdf` / `_KEY.pdf` | Practice exam (humidity → gelato units; coffee price cut) |
| `MAT282_Midterm_FormA.pdf` / `_KEY.pdf` | Real exam, Form A (temperature → gelato units, gelato pre/post, LINEST) |
| `MAT282_Midterm_FormB.pdf` / `_KEY.pdf` | Real exam, Form B (temperature → iced coffee units, pastry pre/post, LINEST) |

Samples are 13 days from `gelato_student_copy.xlsx` (n = 13 so Sheets' QUARTILE puts Q1 at the 4th and Q3 at the 10th value). Summary stats, LINEST and t statistics use all 168 days.

## 1. Objective map (syllabus LOs → your concepts / calculations / computations)

| Q | Pts | Category | Syllabus LO |
|---|---|---|---|
| 1 Testable hypothesis, falsification | 4 | Concept | 1 |
| 2 Validity and reliability | 4 | Concept | 2 |
| 3 Mean/median | 3 | Calculation | 3 |
| 4 Quartiles, fences, outlier | 4 | Calculation | 3, 4 |
| 5 Histogram (practice: box plot) | 3 | Computation (visualisation) | 4 |
| 6 SD, Sheets formula (practice: z-scores) | 3 | Calculation + computation | 3, 5 |
| 7 Scatterplot, line by eye | 3 | Computation (visualisation) | 4 |
| 8 Estimate r | 2 | Concept | 3, 6 |
| 9 FORECAST, residuals, MAE | 4 | Calculation + computation | 5 |
| 10 Slope in context, extrapolation (practice: weighted forecast) | 2 | Concept | 6, 7 |
| 11 Weighted average (practice: repair a conclusion) | 2 | Calculation | 5 |
| 12 Difference of means, t, causal caution | 6 | Calculation + concept | 3, 6, 7 |
| 13 LINEST (TRUE, TRUE) | 6 | Computation | 5, 6, 7 |
| 14 Design your own test (practice: explain a surprise) | 4 | Concept (free thinking) | 1, 5, 7 |

Practice question numbers follow the same objectives but use different tasks. The practice puts a weighted forecast at Q10 and "repair the conclusion" at Q11, and its Q8 is a plot-matching task.

## 2. Practice vs exam

Same objectives, parts, points and timing. Different tasks and results: practice has no outlier and a negative moderate relationship (r = −0.59), a significant price-cut effect (t = 8.5), z-scores, a box plot and a spot-the-error Sheets question. Form A has a high outlier and r = 0.77 with a significant but confounded pre/post result (t = 3.1). Form B has r = 0.79, a low outlier and a non-significant pre/post result (t = −1.5).

## 3. Cut ladder if you need less than 45 minutes

Drop in this order: Q6 (3) → Q11 (2) → Q8 (2) → Q5 (3). Rescale the total accordingly.

## 4. Things to check

- Date: syllabus says the midterm is **Oct 9**; the schedule CSV says Oct 6. The covers use Oct 9.
- The exams are not yet run in Sheets by a student; I computed keys in Python from the xlsx. Spot-check one key against Sheets before printing.
- Q9 assumes temperatures in B2:B14 and units in C2:C14; the printed table doesn't show cell references, so tell students this holds.
- Not committed to git: exam content is unreleased.
