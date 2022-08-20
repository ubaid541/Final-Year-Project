import axios from 'axios'
import moment from 'moment'


export function initCustomer(){
    const orderTableBody = document.querySelector('#customerOrderTable')

    let orders = []
    let markup //html table

    // ajax call for admin order table
    axios.get('/customer-orders',{
        headers : {
            "X-Requested-With" : "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err=>{
        console.log(err)
    })

    function renderItems(items){
      let parseItems = Object.values(items)
      return parseItems.map((menuItem)=>{
         return `
         <td class="text-center">${menuItem.item.pro_name}</td>
         <td class="text-center">${menuItem.item.pro_price}/Rs</td>
         <td class="text-center">${menuItem.qty}-Pcs</td>
         <td class="text-center">
         ${menuItem.item.addon != 0 ? menuItem.item.pro_addon.addon_name : 'no addon'} -
         ${menuItem.item.addon != 0 ? menuItem.item.pro_addon.addon_price : ''}
         </td>
         <td class="text-center">
         ${menuItem.item.attr != 0 ? menuItem.item.pro_attr.attr_name : 'no attribute'} -
         ${menuItem.item.addon != 0 ? menuItem.item.pro_attr.attr_price : ''}
         </td>
         `
      }).join('')
  }

    function generateMarkup(orders){
        return orders.map(order => {
            return[
             `
             <tr>
             <td class="text-center">${ order._id}</td>
             <td class="text-center">
             ${ order.customerId.username }
             </td>
             <td class="text-center">${ order.phone }</td>
             <td class="text-center">COD</td>
             <% if(order.payment_status === 'unpaid'){ %>
             <td class="text-center text-danger">unpaid</td>
             <% } else if(order.payment_status === 'paid'){ %>
             <td class="text-center text-success">Paid</td>
             <% } %>
             <td class="text-center">
               <% if(order.status === 'order_placed'){ %>
               <p class="text-primary">Order Placed</p>
               <% } else if(order.status === 'processing'){ %>
               <p class="text-primary">Processing</p>
               <% } else if(order.status === 'completed'){ %>
               <p class="text-success">Completed</p>
               <% } else if(order.status === 'cancelled') { %>
               <p class="text-danger">Canceled</p>
               <% } %>
             </td>
             <td class="text-center">Business name</td>
             <td class="text-center">
               <%= moment(order.createdAt).format('YYYY-MM-DD hh:mm A')
               %>
             </td>
             <td class="text-center"><%= order.totalQty %></td>
             <td class="text-center"><%= order.totalPrice %>/Rs</td>
             <td class="text-center">
               <div class="dropdown">
                 <button
                   class="btn btn-secondary btn-sm dropdown-toggle"
                   type="button"
                   id="dropdownMenuButton1"
                   data-bs-toggle="dropdown"
                   aria-expanded="false"
                 >
                   <i class="bi bi-gear-fill"></i>
                 </button>
                 <ul
                   class="dropdown-menu shadow-lg rounded mt-1"
                   aria-labelledby="dropdownMenuButton1"
                 >
                   <li>
                     <a
                       class="dropdown-item"
                       href="/customer/delete-order/<%= order._id %>"
                       >Delete</a
                     >
                   </li>
                 </ul>
               </div>
             </td>
           </tr>
            `]
        }).join('')
    }



}