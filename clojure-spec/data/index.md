# Clojure Spec for data
Specifications can be defined for any data in Clojure, be that simple values or complex data structures.

Specifications can be predicate functions, ,,, or custom functions that return true or false.

There three ways to work with data specifications

* `conform` - test if data conforms to a specification
* `valid?` - predicate to test if data conforms to a specification
* `explain` - explain why a value is not conforming to a specification

## Conform
`clojure.spec.alpha/conform` takes two arguments
- a specification
- a value to test against the specification

`:clojure.spec.alpha/invalid` is returned when a value does not conform to a specification.

If the value does conform to the specification, then the value is returned.  This value is referred to as a conformed value.

## Valid?
`clojure.spec.alpha/valid?` takes two arguments
- a specification
- a value to test against the specification

`clojure.spec.alpha/valid?` is a predicate function.

`true` is returned if the value meets the specification, otherwise `false` is returned.

## Explain
`clojure.spec.alpha/explain` takes two arguments
- a specification
- a value to test against the specification

`Success` string is sent to standard out if the value meets the specification

A string explaining where the value deviates from the specification is sent to standard out if the value does not meet the specification.



;; Question: when use valid? rather than conform?



;; clojure.spec documents your code
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Using doc to show the spec

;; (require '[clojure.repl])

;; (clojure.repl/doc map)

;; (clojure.repl/doc :playing-card/suit)
;; ;; prints in the REPL buffer:
;; ;; :playing-card/suit
;; ;; Spec
;; ;; #{:spade :heart :diamond :club}

;; (clojure.repl/doc ::cat-bread)




;; Composing specifications
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; No spec is an island


;; `and` and `or` macros can be used to compose specs

;;clojure.core
(and false true false)
(or true false)

;; When multiple specs should be true
(spec/def ::meaning-of-life
  (spec/and int?
            even?
            #(= 42 %)))


;; or for when at least one spec should be true

(spec/def ::meaning-of-life-int-or-string
  (spec/or :integer #(= 42 %)
           :string  #(= "forty two" %)))

;; Each condition in the spec is annotated with a tag
;; tags give each conditional branch names
;; those are part of the return value from conform and other spec functions
;; providing context as to why a value passed the spec.

;; When an or is conformed, it returns a vector with the condition name and conformed value:

(spec/conform ::meaning-of-life-int-or-string 42)

(spec/conform ::meaning-of-life-int-or-string "forty two")


(spec/conform ::meaning-of-life-int-or-string :entropy)



;; What about nil values
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Some predicates do not consider `nil` a valid value
;; typically those predicates that check for a specific type

;; spec/nilable will transform a predicate to use nil

(spec/valid? string? nil)

(type "what type am I")
(type nil)

(spec/valid? (spec/nilable string?) nil)




;; Define a spec for an online back account
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Designing a spec outside-in

;; Users are referred to as account-holders, so lets define that specification
;; each account holder has mandatory information

(spec/def ::account-holder
  (spec/keys :req [::account-id ::first-name ::last-name ::email-address ::home-address ::social-secuirty-id]
             :opt [::accounts-associated]))


(spec/def ::account-id uuid?)


;; Optionally the account holder can have accounts associated to them.
;; A bank account has multiple attributes also
;; using spec/keys we can say all associated accounts must be a bank accounts

(spec/def ::accounts-associated
  (spec/keys :req [::bank-account]))


;; Define what makes up a bank account, for now there is only one type of account.

(spec/def ::bank-account
  (spec/keys :req [::bank-account-id
                   ::account-balance
                   ::account-status
                   ::arranged-overdraft]
             :opt [::bank-account-alerts]))


;; This spec could be extended to cover different types of accounts
;; eg. mortgages, loans, savings, current, ISA (and all their variations), etc.


;; So now we need to specify what the component parts of a bank are


(spec/def ::bank-account-id uuid?)
(spec/def ::account-balance number?)
(spec/def ::account-status #{:credit :overdrawn})
(spec/def ::arranged-overdraft (spec/and int? #(> 1000 %)))
(spec/def ::bank-account-alerts #{:yes :warnings-only :no})


;; NOTE: The spec should be written in reverse order in the clojure source file
;; but we can evaluate in reverse to test it.



;; Testing the specification

(spec/valid? ::account-holder
             {::first-name "John"
              ::last-name  "Practicalli"
              ::email      "nospam@practicalli.spm"})


(spec/conform ::account-holder
              {::first-name "John"
               ::last-name  "Practicalli"
               ::email      "nospam@practicalli.spm"})


;; Investigate what the error is with explain

(spec/explain ::account-holder
              {::first-name "John"
               ::last-name  "Practicalli"
               ::email      "nospam@practicalli.spm"})

;; #:practicalli.leveraging-spec{:first-name "John", :last-name "Practicalli", :email "nospam@practicalli.spm"} - failed: (contains? % :practicalli.leveraging-spec/social-secuirty-id) spec: :practicalli.leveraging-spec/account-holder


;; Its less obvious to human eyes what has failed with explain-data though

(spec/explain-data ::account-holder
                   {::first-name "John"
                    ::last-name  "Practicalli"
                    ::email      "nospam@practicalli.spm"})
;; => #:clojure.spec.alpha{:problems
;;                         ({:path [],
;;                           :pred
;;                           (clojure.core/fn
;;                            [%]
;;                            (clojure.core/contains?
;;                             %
;;                             :practicalli.leveraging-spec/email-address)),
;;                           :val
;;                           #:practicalli.leveraging-spec{:first-name "John",
;;                                                         :last-name "Practicalli",
;;                                                         :email
;;                                                         "nospam@practicalli.spm"},
;;                           :via [:practicalli.leveraging-spec/account-holder],
;;                           :in []}
;;                          {:path [],
;;                           :pred
;;                           (clojure.core/fn
;;                            [%]
;;                            (clojure.core/contains?
;;                             %
;;                             :practicalli.leveraging-spec/home-address)),
;;                           :val
;;                           #:practicalli.leveraging-spec{:first-name "John",
;;                                                         :last-name "Practicalli",
;;                                                         :email
;;                                                         "nospam@practicalli.spm"},
;;                           :via [:practicalli.leveraging-spec/account-holder],
;;                           :in []}
;;                          {:path [],
;;                           :pred
;;                           (clojure.core/fn
;;                            [%]
;;                            (clojure.core/contains?
;;                             %
;;                             :practicalli.leveraging-spec/social-secuirty-id)),
;;                           :val
;;                           #:practicalli.leveraging-spec{:first-name "John",
;;                                                         :last-name "Practicalli",
;;                                                         :email
;;                                                         "nospam@practicalli.spm"},
;;                           :via [:practicalli.leveraging-spec/account-holder],
;;                           :in []}),
;;                         :spec :practicalli.leveraging-spec/account-holder,
;;                         :value
;;                         #:practicalli.leveraging-spec{:first-name "John",
;;                                                       :last-name "Practicalli",
;;                                                       :email
;;                                                       "nospam@practicalli.spm"}}






;; Experimenting with card game decks and spec
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Representing different aspects of card game decks

;; Suits from different regions are called by different names
;; There are 4 suits in a card deck

(spec/def ::suits-french #{:hearts :tiles :clovers :pikes})
(spec/def ::suits-german #{:hearts :bells :acorns :leaves})
(spec/def ::suits-spanish #{:cups :coins :clubs :swords})
(spec/def ::suits-italian #{:cups :coins :clubs :swords})
(spec/def ::suits-swiss-german #{:roses :bells :acorns :shields})


;; check if a deck contains 4 suits


;; check if a deck is one of the regions above



;; Info: Jack queen king are called face cards (USA) or court cards (UK)
:face-cards
:court-cards

;; Each suit in the deck has the same rank of cards
;; explicitly defining a rank
(spec/def ::rank #{:ace 2 3 4 5 6 7 8 9 10 :jack :queen :king})


;; rank can be defined more succinctly with the range function
(spec/def ::rank (into #{:ace :jack :queen :king} (range 2 11)))

;; (clojure.repl/doc ::rank)
;; :practicalli.leveraging-spec/rank
;; Spec
;; (into #{:king :queen :ace :jack} (range 2 11))

(into #{:ace :jack :queen :king} (range 2 11))
;; => #{7 :king 4 :queen :ace 6 3 2 :jack 9 5 10 8}













;; Example: Oz data structures for Vega-lite
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Ensure the relevant sections are included
;; Define what sections are optional
;; Check the structure of GeoJSON files ?
