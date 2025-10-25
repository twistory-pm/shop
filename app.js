// app.js
document.addEventListener('DOMContentLoaded',()=>{
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const closeCart = document.getElementById('close-cart');
  const addBtns = document.querySelectorAll('.add-to-cart');
  const cartCount = document.getElementById('cart-count');
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout');

  let cart = JSON.parse(localStorage.getItem('cart')||'[]');

  function updateCount(){ cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0) }
  function save(){ localStorage.setItem('cart', JSON.stringify(cart)); updateCount(); renderCart(); }

  function renderCart(){
    cartItemsDiv.innerHTML = '';
    let total = 0;
    if(cart.length===0) cartItemsDiv.innerHTML = '<p>Không có sản phẩm</p>';
    cart.forEach(item=>{
      total += item.price*item.qty;
      const el = document.createElement('div');
      el.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:8px">
        <div>${item.name} x${item.qty}</div><div>${(item.price*item.qty).toLocaleString()}₫</div>
      </div>`;
      cartItemsDiv.appendChild(el);
    });
 cartTotal.textContent = total.toLocaleString() + '₫';
  }

  addBtns.forEach(btn=>{
    btn.addEventListener('click', e=>{
      const card = e.target.closest('.product');
      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = parseInt(card.dataset.price,10);
      const found = cart.find(i=>i.id===id);
      if(found) found.qty++;
      else cart.push({id,name,price,qty:1});
      save();
    })
  });

  cartBtn.addEventListener('click', ()=>{ cartModal.classList.add('show'); renderCart(); });
  closeCart.addEventListener('click', ()=>{ cartModal.classList.remove('show'); });
  checkoutBtn.addEventListener('click', ()=>{
    if(cart.length===0){ alert('Giỏ hàng trống'); return; }
    // demo: kết xuất order để copy/paste hoặc gửi email. Bạn tích hợp PayPal/Snipcart ở bước sau.
    alert('Demo checkout: bạn có thể xuất đơn, hoặc tích hợp phương thức thanh toán.');
    // clear cart:
    cart = []; save(); cartModal.classList.remove('show');
  });

  updateCount(); renderCart();
});
