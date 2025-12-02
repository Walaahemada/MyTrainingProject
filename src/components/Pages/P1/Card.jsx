

function Card({ico="",x="x",y="y",a="a",b="b",c="c",d="d"}) {
    return (
        <div className="card">
          
        <div className="icon"><i class={ico}></i></div>
    
        <h3 >{x}</h3>
        <p> {y}</p>
        <ul>
          <li style={{margin:"8px"}}> {a}  <i class="ri-check-line text-green-500"></i></li>
          <li style={{margin:"8px"}}>{b} <i class="ri-check-line text-green-500"></i></li>
          <li style={{margin:"8px"}}>{c}<i class="ri-check-line text-green-500"></i> </li>
          <li style={{margin:"8px"}}>{d}<i class="ri-check-line text-green-500"></i> </li>
        </ul>
      </div>
    );
  }
  
  export default Card;