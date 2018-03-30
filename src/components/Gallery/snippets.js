// state ={
//     loading: true
// }

// componentDidMount(){
//     this.fetchData()
//         .catch((error)=>{
//             this.setState({
//                 loading:false,
//                 error
//             })
//         })
// }
// async fetchData(){
//     let response = await fetch('/collections/api/cards/channels/gory/', {credentials: 'same-origin'});
//     let json = await response.json();
//         //throw new Error('Fatal');
//     this.setState({
//         cards: json.results,
//         loading:false
//     });
// }

// componentDidMount() {
//     window.addEventListener('resize', this.resizeAllGridItems);
// }
//
// componentWillUnmount() {
//     window.removeEventListener('resize', this.resizeAllGridItems);
// }
//
// resizeGridItem(item){
//     const grid = document.getElementsByClassName("gallery")[0];
//     const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
//     const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
//     const rowSpan = Math.ceil((item.querySelector('.gallery__image').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
//     item.style.gridRowEnd = "span "+rowSpan;
// }
//
// resizeAllGridItems(){
//     const allItems = document.getElementsByClassName("gallery__image");
//     for(let x=0;x<allItems.length;x++){
//         this.resizeGridItem(allItems[x]);
//     }
// }

// function resizeInstance(instance){
//     const item = instance.elements[0];
//     resizeGridItem(item);
// }
//



// if(this.state.loading){
//     return(
//         <div>
//             Spinner
//         </div>
//     )
// }
// if(this.state.error){
//     return(
//         <div>
//             Error
//         </div>
//     )
// }