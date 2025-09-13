
import './App.css'
import AnalyticsDashboard from './component/AnalyticsDashboard/AnalyticsDashboard'
import InvoiceTemplate from './component/InvoiceTemplate/InvoiceTemplate'
import PaymentForm from './component/PaymentForm/PaymentForm'
import PlanPayment from './component/PlanPayment/PlanPayment'
import ReportGenerator from './component/ReportGenerator/ReportGenerator'

function App() {
  

  return (
    <>
     <PaymentForm/>
     <PlanPayment/>
     <InvoiceTemplate/>
     <AnalyticsDashboard/>
     <ReportGenerator/>
    </>
  )
}

export default App
