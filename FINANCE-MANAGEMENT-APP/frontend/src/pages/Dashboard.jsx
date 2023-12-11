// rrd imports
import { Link, useLoaderData, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// library imports
import { toast } from "react-toastify";
import "../styles/styles.css";
// components
import Intro, { IntroWithRouter } from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import AddMonthlyBudgetForm from "../components/AddMonthlyBudgetForm";
import axios from "axios";
import Footer from "../components/Footer";
//  helper functions
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

// action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData();
  const [budgets, setBudgets] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const { budgetId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [month, setMonth] = useState([]);
  const navigate = useNavigate();

  const getBudgetsForUser = () => {
    axios
      .get("http://localhost:3000/api/expenseCategory/getAll/" + budgetId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBudgets(response.data);
        setDataReady(true);
        console.log(budgets);
        console.log(response);
      });
  };

  const getMonthlyBudget = () => {
    axios
      .get(
        "http://localhost:3000/api/expenseCategory/actualMonthlyValue/" +
          budgetId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setMonth(response.data);
      });
  };

  useEffect(() => {
    getBudgetsForUser();
    getMonthlyBudget();
  }, []);

  const refresh = () => {
    getBudgetsForUser();
  };

  const refresh2 = () => {
    window.location.reload(false);
  };

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            <span className="accent">{userName}</span> wybierz co chcesz zrobić
            ↓
          </h1>
          <div className="grid-sm">
            <span>
              <h2>
                Wykorzystano <span className="accent">{month.expenseCost}</span>{" "}
                z łącznej kwoty budżetu miesięcznego{" "}
                <span className="accent">{month.fullAmount}</span>.
              </h2>
            </span>
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="form4">
                  <AddBudgetForm refresh={refresh} />

                  <AddExpenseForm budgets={budgets} refresh2={refresh2} />
                </div>
                <h2>Istniejące budżety</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem
                      key={budget.id}
                      budget={budget}
                      refresh={refreshing}
                    />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Ostatnie wydatki</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn1">
                        Zobacz wszystkie wydatki
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="form1">
                <AddBudgetForm refresh={refresh} />
              </div>
            )}
          </div>
          <div className="button2">
            {" "}
            <button
              onClick={() => navigate("/chartPage/" + budgetId)}
              className="btn4"
            >
              Sprawdź zestawienie wydatków
            </button>
          </div>
        </div>
      ) : (
        <IntroWithRouter />
      )}
    </>
  );
};
export default Dashboard;
