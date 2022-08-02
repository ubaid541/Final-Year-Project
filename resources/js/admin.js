import axios from 'axios'
import moment from 'moment'


export function initAdmin(){
    const orderTableBody = document.querySelector('#orderTableBody')

    let orders = []
    let markup //html table

    // ajax call for admin order table
    axios.get('/admin/orders',{
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
             <td class="text-center">${ order.customerId.username }</td>
             <td class="text-center">${ order.phone }</td>
             <td class="text-center">${ order.address }</td>
             <td class="text-center">COD</td>
             <td class="text-center">
             <form action="/admin/order/payment_status" method="post">
             <input type="hidden" name="orderId" value="${ order._id}">
             <select name="payment_status" class="form-select" aria-label="Default select example" onchange="this.form.submit()">
                 <option value="paid" ${ order.payment_status === 'paid' ? 'selected' : ''}>Paid</option>
                 <option value="unpaid" ${ order.payment_status === 'unpaid' ? 'selected' : ''}>Unpaid</option>
             </select>
             </form>
             </td>
             <td class="text-center">
             <form action="/admin/order/status" method="post">
             <input type="hidden" name="orderId" value="${ order._id}">
             <select name="status" class="form-select" aria-label="Default select example" onchange="this.form.submit()">
                 <option selected>Status</option>
                 <option value="order_placed" ${ order.status === 'order_placed' ? 'selected' : ''}>Order Placed</option>
                 <option value="processing" ${ order.status === 'processing' ? 'selected' : ''}>Processing</option>
                 <option value="completed" ${ order.status === 'completed' ? 'selected' : ''}>Completed</option>
                 <option value="cancelled" ${ order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
             </select>
             </form>
             </td>
             <td class="text-center"> ${ moment(order.createdAt).format('YYYY-MM-DD hh:mm A') }</td>
             <td class="text-center">${ order.totalPrice }/Rs</td>
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
                       href="/admin/delete-order/${ order._id }"
                       >Delete</a
                     >
                   </li>
                 </ul>
               </div>
             </td>
           </tr>
           <tr>
           <td class="text-center fw-bold">Product details</td>
           <tr>
           ${ renderItems(order.items)}
           </tr>
           </tr>
            `]
        }).join('')
    }

}