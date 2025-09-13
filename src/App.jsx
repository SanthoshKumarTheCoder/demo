
import './App.css'
import AnalyticsDashboard from './component/AnalyticsDashboard/AnalyticsDashboard'
import InvoiceTemplate from './component/InvoiceTemplate/InvoiceTemplate'
import PlanPayment from './component/PlanPayment/PlanPayment'
import ReportGenerator from './component/ReportGenerator/ReportGenerator'

function App() {
  

  return (
    <>
   
     <PlanPayment/>
     <InvoiceTemplate/>
     <AnalyticsDashboard/>
     <ReportGenerator/>
    </>
  )
}

export default App
