document.addEventListener("DOMContentLoaded", () => {
  const prices = {
    vegan_leather_jacket: 102.9,
    red_tshirt: 19.99,
    floral_dress: 33.99,
    green_tanktop: 17.99,
  };

  const sizes = ["Extra Small", "Small", "Medium", "Large", "Extra Large"];

  const addToCartBtn = document.querySelector(".item-option button");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const itemSelect = document.getElementById("item-select");
      const sizeSelect = document.getElementById("size-select");
      const itemKey = itemSelect.value;

      const newItem = {
        id: Date.now() + Math.random(),
        name: itemSelect.options[itemSelect.selectedIndex].text,
        size: sizeSelect.options[sizeSelect.selectedIndex].text,
        price: prices[itemKey],
      };

      const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
      cart.push(newItem);
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      alert(newItem.name + " added to cart!");
    });
  }

  const orderSummary = document.querySelector(".order-summary");
  if (orderSummary && window.location.href.includes("checkout-page.html")) {
    const renderCart = () => {
      let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
      const payBtn = document.querySelector(".pay-btn");
      const thankYou = document.querySelector(".thank-you");

      let displayArea = document.getElementById("cart-display-area");
      if (!displayArea) {
        displayArea = document.createElement("div");
        displayArea.id = "cart-display-area";
        orderSummary.insertBefore(displayArea, payBtn);
      }
      displayArea.innerHTML = "";
      displayArea.style.textAlign = "center";
      displayArea.style.margin = "20px 0";

      if (cart.length === 0) {
        displayArea.innerHTML = "<p>Your cart is empty.</p>";
        if (payBtn) payBtn.style.display = "none";
        return;
      }

      let grandTotal = 0;
      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.style.marginBottom = "15px";
        itemDiv.style.borderBottom = "1px solid #eee";
        itemDiv.style.paddingBottom = "10px";

        const text = document.createElement("span");
        text.textContent = `${item.name} - $${item.price.toFixed(2)} | Size: `;
        itemDiv.appendChild(text);

        const sizeSelector = document.createElement("select");
        sizes.forEach((s) => {
          const opt = document.createElement("option");
          opt.value = s;
          opt.textContent = s;
          if (s === item.size) opt.selected = true;
          sizeSelector.appendChild(opt);
        });
        sizeSelector.onchange = (e) => {
          cart[index].size = e.target.value;
          localStorage.setItem("shoppingCart", JSON.stringify(cart));
        };
        itemDiv.appendChild(sizeSelector);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.style.marginLeft = "10px";
        removeBtn.onclick = () => {
          cart.splice(index, 1);
          localStorage.setItem("shoppingCart", JSON.stringify(cart));
          renderCart();
        };
        itemDiv.appendChild(removeBtn);

        displayArea.appendChild(itemDiv);
        grandTotal += item.price;
      });

      const totalH3 = document.createElement("h3");
      totalH3.textContent = `Total: $${grandTotal.toFixed(2)}`;
      displayArea.appendChild(totalH3);

      if (payBtn) {
        payBtn.style.display = "block";
        payBtn.onclick = () => {
          localStorage.removeItem("shoppingCart");
          orderSummary.style.display = "none";
          if (thankYou) thankYou.style.display = "block";
        };
      }
    };

    renderCart();
  }
});
