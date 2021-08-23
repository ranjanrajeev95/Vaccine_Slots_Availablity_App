import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNavigation from "./components/navbar.component";
import Homepage from "./pages/home.page";
import Pincode from "./pages/pincode.page";

function App() {
  return (
	<div className="bg-light pb-5" style={{minHeight: "100vh"}}>
		<Router>
			<TopNavigation />
			<br/>
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/pincode-search" exact component={Pincode} />
			</Switch>
		</Router>
		<div class="footer">
            <div className="font-weight-bolder">Made with <span className="text-danger" style={{fontSize: "25px"}}>&hearts;</span> by Rajeev Ranjan</div>
        </div>
	</div>
  );
}

export default App;
