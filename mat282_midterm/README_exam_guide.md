# MAT282 Midterm package (Fall 2026)

Rebuilt from the syllabus learning outcomes (LOs) and your schedule. The MAT182 exam was used only to see the output format. The design is a **modelling exam**: students use intuition to narrow the variables, then use statistics to test that intuition.

| File | Use |
|---|---|
| `MAT282_PRACTICE_Midterm` (.pdf/.docx) and `_KEY.pdf` | Practice: **pastry** sales. The key may be shared after the review. |
| `MAT282_Midterm_Version_A` (.pdf/.docx) and `_KEY.pdf` | Exam, Version A: **gelato** sales |
| `MAT282_Midterm_Version_B` (.pdf/.docx) and `_KEY.pdf` | Exam, Version B: **iced coffee** sales |

50 points each. About 55 minutes of work (stage timings are printed in the banners), 8 pages, A4. All data are from `gelato_student_copy.xlsx` (168 days).

## 1. The exam is the modelling workflow

| Stage | Pts | What students do | The modelling idea it tests |
|---|---|---|---|
| 1 Think first | 9 | Choose four predictors with signs and reasons, leave two out, say what would prove them wrong, judge data quality. **Before seeing any numbers.** | Intuition narrows the variables; hypotheses must be falsifiable |
| 2 Each variable alone | 7 | z-scores, mean vs median, a scatterplot of a zero-heavy variable (rainfall), an extreme day | A skewed, outlier-driven predictor is a warning sign; check it, do not assume |
| 3 Variables together | 7 | Correlation matrix: strongest predictor, overlapping pairs, r² between predictors, simple regression from summaries | Predictors should carry separate (independent) information |
| 4 LINEST | 13 | Does adding a variable help (t, adjusted R²); decode raw LINEST (reversed order); price paradox (t-test vs regression); residuals; residual-guided variable choice | Fit measures, residuals, confounding |
| 5 Unseen days | 7 | Weighted-average baseline vs two LINEST models on days not used for fitting: absolute errors and MAE | R² is not forecasting skill; simple versus intermediate toolbox |
| 6 Advise and extend | 7 | A plain-language memo; propose a new variable and how to test it | Communicate; free thinking |

## 2. Objective map

| Q | Pts | Category | LO | Closest schedule block (from lesson titles) |
|---|---|---|---|---|
| 1 Choose variables and signs | 4 | Concept | 1, 5 | Defining error and uncertainty; Multiple relationships! |
| 2 Leave two out | 2 | Concept | 2, 5 | same |
| 3 What would prove you wrong | 1 | Concept | 1 | same |
| 4 Validity and reliability | 2 | Concept | 2 | Defining error and uncertainty |
| 5 z-scores, skew | 2 | Calculation | 3 | Measures of central tendency; Summary statistics |
| 6 Weak skewed predictor, rainy_day formula | 3 | Concept and computation | 3, 4, 5 | Outliers; IF functions |
| 7 Extreme outcome: keep or delete | 2 | Calculation and concept | 3, 6 | Down and outlier; Addressing outliers |
| 8 Strongest predictor, overlapping pairs | 2 | Computation | 3 | Correlation; Strong relationships |
| 9 Overlap, r², which to keep | 3 | Concept and calculation | 3, 5, 6 | Multiple relationships! |
| 10 Simple regression from r, s_y, s_x | 2 | Calculation | 3, 5 | What's in the FORECAST()? |
| 11 Adding sunshine: t, adjusted R² | 3 | Calculation and concept | 6 | Variation in predictions |
| 12 Decode LINEST, expectations | 3 | Computation | 5, 6 | Multiple relationships! |
| 13 Before/after t-test vs regression price | 3 | Calculation and concept | 3, 6, 7 | Significant differences; Changing prices; A recipe for change |
| 14 Predict, residual, unusual day | 2 | Calculation | 6 | Prediction accuracy; Absolute deviation |
| 15 Residual-guided variable, residual sketch | 2 | Concept | 4, 6 | Seems about right |
| 16 Baseline forecast, errors, MAE | 5 | Calculation | 5, 6 | Variable weights; Average absolute deviation |
| 17 Fit vs forecasting | 2 | Concept | 6 | How clear is your crystal ball? |
| 18 Memo to the owner | 3 | Concept | 7 | Wrap-up |
| 19 Your own idea | 4 | Concept (free thinking) | 1, 5, 7 | Adding variation |

LO4 (visualisations) is covered by reading a scatterplot (Q6, Figure 1), a residual plot (Q15, Figure 2) and sketching a residual plot. Histograms and box plots are not used because they come after the midterm in the Tableau block.
Not tested: sparklines, RAND()/random numbers, UNIQUE(), and the risk lessons.

## 3. Versions and practice

Same stages, points and skills. Different data and different results, so neighbours cannot copy and students cannot memorise:

| | Outcome | Skewed predictor check | Price story | Extreme day |
|---|---|---|---|---|
| Version A | gelato | rain evidence collapses without the 11 storm days | price looks irrelevant (r = 0.02) but matters (t = −7.3); before/after t-test points the wrong way | highest day, explained by its inputs: keep |
| Version B | iced coffee | evidence weakens but survives | simple price slope overstates the effect (−44.6 vs −17.5 per €) | lowest day = coldest day, fits the pattern: keep, but do not extrapolate |
| Practice | pastry | as A, different numbers | price **is** the date flag (r = 1.00): effect cannot be isolated | an unexplained spike (2.3 SE): investigate |

The practice also differs in tasks: critique a colleague's variable list, a time-series figure, a 0/1 predictor by hand, a "surprising sign" (temperature is negative for pastries), a variable you excluded turns out significant, actual-vs-predicted figure, and "explain the surprise".

## 4. Corrections and honest limits (please read)

- **Dates.** My earlier note about a date clash was wrong. In your schedule CSV the date line comes *after* its items: Midterm Review is Oct 6, Midterm Exam is Oct 9, matching the syllabus.
- **Policy date.** Prices change on **30 June itself** (the codebook's "inclusive cutoff"), so post_change = 1 from 30 June and the split is 84 days / 84 days. Earlier packages in this session used 85/83 and are superseded.
- **Rain is a real but small effect** in this data set. The exam teaches "skew and outliers are a warning; check it" rather than "skewed means useless": in Version A the rain result is fragile, in Version B it is not.
- **More variables do not overfit here.** Across random splits the 8-variable model forecasts about as well as the 4-variable model. The exam therefore asks students to reason from the unseen-day MAE (no gain from the extra weather variables) and the key says "no better", not "worse". The four unseen days in each table were chosen to keep the ordering found on all 56 unseen days; the key lists the 56-day MAEs.
- **Terms you may not have taught.** Adjusted R² (Q11) and r² between predictors (Q9) come with formulas on the reference sheet. If you did not teach adjusted R², swap Q11(b) for "compare SE of y in M1 and M2".
- **Rules of thumb** on the reference sheet: |z| > 2 unusual, |t| > 2 significant, |r| > 0.7 predictors overlap heavily. Change them in the keys too if you use others.
- **Time.** Designed for about 55 minutes. If the slot is shorter, cut in this order (about 2 minutes each): Q10, Q15, Q5, Q14, then rescale to 50.
- **Verification.** All numbers were recomputed with a second, independent regression routine and checked against the PDFs (135 checks). The Word files are built from the same content but **could not be opened in Word or LibreOffice here**: open one before editing and print from the PDFs.
- Synthetic data: the codebook states the café records are simulated.
