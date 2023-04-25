# Salary Slip Kata

[:fontawesome-solid-book-open: Pracitcalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) provides the `:project/create` alias to create projects using deps-new project.

```bash
clojure -T:project/create :template app :name practicalli/salary-calculator
```

## Problem description

  A typical salary slip contains employee details like employee id, employee name and their monthly salary details like their gross salary, national insurance contributions, tax-free allowance, taxable income and tax payable.

  Salary slips are generated each month for every employee.

## Acceptance criteria

- Salary slip generator should receive an employee with its Employee Id, Employee Name and Annual Gross Salary
- Salary slip should contain the Employee ID, Employee Name, Gross Salary, National Insurance contributions, Tax-free allowance, Taxable income and Tax payable for the month
- The entry point should be the following public function API

```clojure
(defn salary-slip-generator
  ""
  [employee]
  ,,,)
```

## Iterations

Each iteration adds more rules to the calculation. Some iterations also introduce new fields to the salary slip.

In a given iteration, all the salary slips contain the same number fields for each employee (if a tax or contribution does not apply for a given employee, just put £0.00).

This means that for each iteration you will need to add fields to the `SalarySlip` class. In the first iteration, `SalarySlip` only contains the Employee ID, Employee Name and Monthly Gross Salary.

#### Iteration 1: for an annual salary of £5,000.00

This is the most basic case.

- *Given* I have an employee John J Doe with an annual gross salary of £5,000.00
- *When* I generate a monthly salary slip for the employee
- *Then* the monthly salary slip should contain the below

           Employee ID: 12345
           Employee Name: John J Doe
           Gross Salary: £416.67

Calculation rules:

- Monthly Gross Salary: The monthly gross salary is the employee's annual gross salary divided by 12

## Iteration 2: for an annual gross salary of £9,060.00

Here we introduce the National Insurance contribution

The monthly salary slip should contain the below:

           Employee ID: 12345
           Employee Name: John J Doe
           Gross Salary: £755.00
           National Insurance contributions: £10.00

Calculation rules:

- National Insurance contributions: Any amount of money earned above a gross annual salary of £8,060.00 is subject to a National Insurance contribution of 12%

## Iteration 3: for an annual gross salary of £12,000.00

This employee also needs to pay taxes

The monthly salary slip should contain the below:

           Employee ID: 12345
           Employee Name: John J Doe
           Gross Salary: £1,000.00
           National Insurance contributions: £39.40
           Tax-free allowance: £916.67
           Taxable income: £83.33
           Tax Payable: £16.67

Calculation rules:

- Taxable income: Any amount of money earned above a gross annual salary of £11,000.00 is taxed at 20%

## Iteration 4: for an annual gross salary of £45,000.00

This employee pays a higher band of National Insurance and Income Tax.

The monthly salary slip should contain the below:

           Employee ID: 12345
           Employee Name: John J Doe
           Gross Salary: £3,750.00
           National Insurance contributions: £352.73
           Tax-free allowance: £916.67
           Taxable income: £2,833.33
           Tax Payable: £600.00

Calculation rules:

- Taxable income (higher rate): Any amount of money earned above a gross annual salary of £43,000.00 is taxed at 40%
- National Insurance (higher contributions): Any amount of money earned above a gross annual salary of £43,000.00 is only subject to a 2% NI contribution

## Iteration 5: for annual gross salaries of £101,000.00; £111,000.00; £122,000.00 and £150,000.00

For high earners, the tax-free allowance decreases.

The monthly salary slips should contain the below (respectively):

           Employee ID: 12345
           Employee Name: John J Doe
           Gross Salary: £8,416.67
           National Insurance contributions: £446.07
           Tax-free allowance: £875.00
           Taxable income: £7,541.67
           Tax Payable: £2,483.33


           Employee ID: 12345
           Employee Name: John J Doe
           Gross Salary: £9,250.00
           National Insurance contributions: £462.73
           Tax-free allowance: £458.33
           Taxable income: £8,791.67
           Tax Payable: £2,983.33


           Employee ID: 12345
           Employee Name: John J Doe
           Gross Salary: £10,166.67
           National Insurance contributions: £481.07
           Tax-free allowance: £0.00
           Taxable income: £10,166.67
           Tax Payable: £3,533.33


           Employee ID: 12345
           Employee Name: John J Doe
           Gross Salary: £12,500.00
           National Insurance contributions: £527.73
           Tax-free allowance: £0.00
           Taxable income: £12,500.00
           Tax Payable: £4,466.67

Calculation rules:

- Tax-free allowance: When the Annual Gross Salary exceeds £100,000.00, the tax-free allowance starts decreasing. It decreases by £1 for every £2 earned over £100,000.00. And this excess is taxed at the Higher rate tax.

## Iteration 6: for an annual gross salary of £160,000.00

The employee goes into the additional rate band.

The monthly salary slip should contain the below:

          Employee ID: 12345
          Employee Name: John J Doe
          Gross Salary: £13,333.33
          National Insurance contributions: £544.40
          Tax-free allowance: £0.00
          Taxable income: £13,333.33
          Tax Payable: £4,841.67

Calculation rules:

- Income tax (additional rate band) : Any amount of money earned above a gross annual salary of £150,000.00 is taxed at 45%

??? EXAMPLE "Practicalli Salary Slip Kata"
    <!-- TODO; challenge: complete salary slip challenge example  -->
    <!-- from https://github.com/practicalli-john/salary-slip-kata-devox-2019 -->
    ```clojure
    (ns salary-slip-kata.core)

    ;; Developer Anarchy by Fred George
    ;; - made devs write the same solution in different languages
    ;; -- helps devs master the business domain
    ;; -- helps devs master technology domain


    (defn- national-insurance-contribution
      "Calculate the national insurance contribution due for a given annual salary.

      ---------------------+-------------------------+--------
      Band                 | NI deductible income    | NI Rate
      ---------------------+-------------------------+--------
      No contributions     | Up to £8,060.00         |    0%
      Basic contributions  | £8,060.00 to £43,000.00 |   12%
      Higher contributions | over £43,000.00         |    2%
      ---------------------+-------------------------+-------- "

      [annual-gross-salary]
      ;; add a cond statement to return the calculate the value with respect to the band.
      (* annual-gross-salary 0.12))


    ;; taxable income
    ;; ---------------------+---------------------------+---------
    ;; Band                 | Taxable income            | Tax rate
    ;; ---------------------+---------------------------+---------
    ;; Personal Allowance*  | Up to £11,000.00          |    0%
    ;; Basic rate           | £11,000.00 to £43,000.00  |   20%
    ;; Higher rate          | £43,000.00 to £150,000.00 |   40%
    ;; Additional rate      | over £150,000.00          |   45%
    ;; ---------------------+---------------------------+---------


    (defn salary-slip
      "Creates a salary slip for a person

      Specifically for employee of 24K annual salary"

      [{:keys [employee-id
               employee-name
               annual-gross-salary]}]
      (let [tax-free-allowance 11000
            taxable-income     (- annual-gross-salary
                                  tax-free-allowance)]
        {:employee-id        employee-id
         :employee-name      employee-name
         :gross-salary       (/ annual-gross-salary 12)
         :national-insurance (national-insurance-contribution annual-gross-salary)
         :tax-free-allowance tax-free-allowance
         :taxable-income     taxable-income
         :tax-payable        (* taxable-income 0.20)}))
        ```
