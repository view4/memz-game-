		class App extends React.Component{
			constructor(){
				super();
				this.state={
					initialArray:["hummus", "sabich", "shakshuka", "salad", "baklava", "falafel"],
					randomisedArray:[],
					finalArray:[],
					openedArray:[],
					counter:0
				}
				this.start();
				this.clicked=this.clicked.bind(this);
			}
			//methods here
			start(){
			 let finalArray=[];
			 this.state.initialArray=this.state.initialArray.concat(this.state.initialArray);
			 this.state.randomisedArray=this.shuffle(this.state.initialArray);
			 

			 this.state.randomisedArray.map(name=>{
			 	finalArray.push({
				 name,
				 close:true,
				 complete:false,
				 fail:false
				 })
			 })
			this.state.finalArray=finalArray;
			}

			clicked(food, index){
				if(this.state.openedArray.length==2){
					setTimeout(()=>{
					this.check(index)
					},2000)
				}else if(this.state.openedArray==0|| this.state.openedArray[0].index!=index){
					
					let finalArray=this.state.finalArray;
					let foods=this.state.openedArray;
					let foodObject={
						name:food,
						index
					}
					
					finalArray[index].close=false;
					foods.push(foodObject);
					this.setState({
						openedArray:foods,
						finalArray:finalArray,
						counter:this.state.counter+1
					})
					if(foods.length==2){
						setTimeout(()=>{
						this.check(index)
						},2000)
					}
				}
					
	
			}
			check(){
				var one=this.state.openedArray[0];
				var two=this.state.openedArray[1];
				var finalArray=this.state.finalArray;
				if(one.name==two.name){
					finalArray[one.index].complete=true;
					finalArray[two.index].complete=true;
				}else {
					finalArray[one.index].close=true;
					finalArray[two.index].close=true;
				}
				
				this.setState({
					finalArray,
					openedArray:[],
				})
			}
			shuffle(array){
				
				var output=[];
				var i=0;
				while(array.length!=0){
					var itemIndex=Math.floor(Math.random() * array.length);
					output[i]=array.splice(itemIndex,1)[0];
					i++;
					
					
				}
				return output;
			}
			render(){
				//const cards=
				return(
					<div className="wrapper">
						<div className="counter">
							{this.state.counter}
						</div>
						<div className="container">
							
							{
							this.state.finalArray.map((food,index)=>
								<div className="card" onClick={()=>this.clicked(food.name,index)}>
									<div className= {`front ${this.state.finalArray[index].close? "hide":"show" }`}>
										<img src={`./images/${food.name}.jpeg`} />
									</div>
									<div className={`back ${this.state.finalArray[index].close? "show":"hide" }`} >
										
									</div>
								</div>
						)}
							
						</div>
						
					</div>
				);
			}	
		}

		/*class card extends React.Component{
			render(){
				return(
					
				
				);
			}}*/


		ReactDOM.render(
					  <App />,
	 				 document.getElementById('root')
				);