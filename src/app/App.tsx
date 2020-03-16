import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Index from '../layout/Index';

export default function App() {
  return (
    <Router>
      <Index />
    </Router>
  );
}
// export interface Props{
// 	name:string;
// }
// class App extends React.Component <Props>{
// 	constructor(props:Props){
// 		super(props)
// 	}
//      public render() {
//       return (
//         <div>
//           <Button type="primary">Button</Button>
//         </div>
//       );
//     }
// }
// export default App;
