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
