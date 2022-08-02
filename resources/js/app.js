import Noty from 'noty'
import axios from 'axios'
import {initAdmin} from './admin'


let addToCart = document.querySelectorAll('.add_to_cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(product){
    axios.post('/update-cart',product).then(res=>{
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type : 'success',
            timeout : 1000,
            text: "Item added to cart successffully",
            progressBar: false
          }).show();
    }).catch(err =>{
        new Noty({
            type : 'error',
            timeout : 1000,
            text: "Something went wrong",
            progressBar: false
          }).show();
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
       let product = JSON.parse(btn.dataset.product)

        let qty = document.querySelector('#qty').value
        product.qty = parseInt(qty)

        // let business_id = document.querySelector('#business_id').value
        // product.seller_id = business_id

        let addon = document.getElementById('addon')
        let attr = document.getElementById('attr')
        let coupon = document.getElementById('discount')

        if(addon){
            if(document.getElementById('addon').checked){
                product.addon = product.pro_addon.addon_price
            }else{
                product.addon = 0
            }

        }else{
            product.addon = 0
        }

      if(attr){
        if(document.getElementById('attr').checked){
            product.attr = product.pro_attr.attr_price
        }else{
            product.attr = 0
        }
      }else{
        product.attr = 0
      }

        if(coupon){
            if(!document.getElementById('discount')){
                product.coupon = 0
           }else{
               product.coupon = product.discount.coupon_value
           }
        }else{
            product.coupon = 0
        }


        updateCart(product)

    })
})


// hide alert after few second
const successMsg = document.querySelector('.alert-success')
if(successMsg){
    setTimeout(()=>{
        successMsg.remove()
    },2000)
}

const errorMsg = document.querySelector('.alert-danger')
if(errorMsg){
    setTimeout(()=>{
        errorMsg.remove()
    },2000)
}

let adminAreaPath = window.location.pathname

if(adminAreaPath.includes('admin')){
    initAdmin()
}






