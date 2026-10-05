# MAT282 Midterm package (Fall 2026)

Built from the syllabus learning outcomes, your schedule (assignments through Oct 2) and a focus on **LINEST output and residuals**. The earlier MAT182 session was used only for the *format* (blueprint parts A to F, timed banners, reference box, mock Sheets screenshot, answer-key layout).

| File | Use |
|---|---|
| `MAT282_Practice_Midterm.pdf/.docx` + `_KEY` | Practice (sunshine → iced coffee; no outlier; moderate r; coffee price cut) |
| `MAT282_Midterm_FormA.pdf/.docx` + `_KEY` | Exam, Form A (temperature → gelato; one outlier; gelato price rise) |
| `MAT282_Midterm_FormB.pdf/.docx` + `_KEY` | Exam, Form B (temperature → iced coffee; one outlier; pastry price rise) |

50 points, about 45 minutes. 10-day sample by hand (Parts A to C); full 168-day LINEST, t-test and risk in D to F.

## 1. What is on the exam, and where it comes from in your schedule

| Part | Question | Pts | Your category | Syllabus LO | Schedule block |
|---|---|---|---|---|---|
| A | A1 testable hypothesis + falsifier | 2 | Concept | 1 | Defining error and uncertainty |
| A | A2 predict-before-you-look sketch + competing variable | 2 | Concept | 1, 7 | A (crimes) committed relationship |
| A | A3 validity / reliability | 2 | Concept | 2 | Defining error and uncertainty |
| B | B1 mean, median | 2 | Calculation | 3 | Measures of central tendency |
| B | B2 sample SD | 3 | Calculation | 3 | Summary statistics |
| B | B3 conditional means (AVERAGEIFS logic) | 2 | Calculation | 3 | Averages and IF conditions |
| B | B4 weighted average | 2 | Calculation | 5 | Variable weights / Now weight a minute |
| B | B5 outlier by z-score + what to do | 2 | Calc + concept | 3, 6 | Outliers / Addressing outliers |
| C | C1 scatterplot, point of means, line by eye | 3 | Computation (visual) | 4 | Strong relationships |
| C | C2 slope and intercept by hand | 3 | Calculation | 3, 5 | What's in the FORECAST()? |
| C | C3 r and R² | 2 | Calculation + concept | 3, 6 | Correlation |
| C | C4 predictions, residuals, MAE | 4 | Calculation | 6 | Absolute deviation / Average absolute deviation |
| D | D1 AVERAGEIFS / COUNTIFS / FORECAST formulas | 3 | Computation | 3, 5 | IF functions, Counts with multiple criteria |
| D | D2 spot the formula error | 2 | Computation | 5 | FORECAST |
| D | D3 read LINEST coefficients | 3 | Computation | 5, 6 | Multiple relationships! |
| D | D4 t-statistic and SE of y | 2 | Computation | 6 | Variation in predictions |
| D | D5 predict + residual from LINEST | 2 | Computation | 6 | Prediction accuracy |
| E | E1 difference of means, t-test, causal caution | 3 | Calc + concept | 3, 6, 7 | Significant differences, Just t-testing |
| E | E2 prediction ± 2·SE and risk | 2 | Concept + calc | 6, 7 | Risky business |
| F | F1 own mini-blueprint using LINEST | 4 | Concept (free thinking) | 1, 5, 7 | Adding variation |

**Not tested** (flagged so you can decide): sparklines, RAND()/random numbers, UNIQUE(), Tableau block (histograms, box plots, clustering all come after the midterm), and the Introduction-to-Statistics lessons beyond the one multiple-regression lesson.

## 2. Practice vs exam

Same parts, points and timing, different tasks and results. Practice: critique three hypotheses, match four plots to the hypothesis, classify measurement scenarios, no outlier (check and flag a new day), variable-weights forecast, residual plot, FORECAST argument-order error, comparing simple vs multiple regression, expected-loss risk table, surprising-correlation question. Exams: write your own hypothesis, predict-before-you-look sketch, one outlier, conditional means and weighted average, residual table and MAE, range-length error, LINEST coefficient decoding, prediction ± 2·SE.

## 3. Cut ladder (if over 45 minutes)

Drop in this order: B4 (2) → D2 (2) → B3 (2) → E2 (2); rescale to 50.

## 4. Things to check

- **Date:** syllabus says Oct 9, schedule CSV says Oct 6. Covers say Oct 9.
- **Word files:** generated programmatically and **not opened in Word or LibreOffice** (LibreOffice failed to open any .docx in this environment, including your template). Print from the PDFs; open the .docx once before editing.
- **Keys** were computed in Python from the xlsx (regression code checked against a known exact fit). Spot-check one value in Sheets.
- Rules assumed in the exam: outlier if |z| > 2; significant if |t| > 2; Weekend coded as in the data. Change the reference box if your course uses different rules (for example 3 SD).
- LINEST Row 1 is reversed (last X column first): D3 deliberately tests this.
