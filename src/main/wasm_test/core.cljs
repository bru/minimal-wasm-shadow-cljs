(ns wasm-test.core
  (:require ["./glue.js" :as glue]
            [reagent.core :as r]
            [reagent.dom :as rdom]))

(def answer (r/atom 0))

(defn add-numbers-div []
  [:div
   [:p (str "Hello world, the answer is... " @answer)]])

(defn ^:export init []
  (rdom/render [add-numbers-div] (js/document.getElementById "app"))

  (-> (glue/add2wasm 40 2)
      (.then #(reset! answer %))))

