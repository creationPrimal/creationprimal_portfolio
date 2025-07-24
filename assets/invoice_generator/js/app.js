
// data row
let rowIndex = 2;



// Amount calculations
function calculateAmount (rate, qty, result) {
    const rateNum = parseFloat(document.getElementById(`rate-${rate}`).value)|| 0;
    const qtyNum = parseFloat(document.getElementById(`qty-${qty}`).value)|| 0;
    let selectedCurrency = document.getElementById('currencyBtn').value

    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
        selectedCurrency = savedCurrency;
    } else {
        localStorage.setItem('selectedCurrency', selectedCurrency);
    }

    const amount = rateNum * qtyNum;
    document.getElementById(`result-${result}`).value = `${selectedCurrency} ${amount}`;

    // calculate total amount
    calculateTotalAmount(selectedCurrency);
}

// selected currency
function selectedCurrency() {
    const currencyBtn = document.getElementById('currencyBtn');
    // save to local storage
    const currency = currencyBtn.value;
    localStorage.setItem('selectedCurrency', currency);
}

// display selected currency
(() => {
    const currencydisplay = document.getElementById('currencydisplay');
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
        currencydisplay.textContent = `(${savedCurrency}) - Change Currency`;
    }
})()

// add new data item
function addNewItem () {
    

    const mainContainer = document.getElementById('calculations-div');
    const row = document.createElement('div');
    row.className = 'row-item';

    row.innerHTML = `
    <div class="content-data" id="content-data">
        <div class="content-desc">
            <button class="content-delete" onclick="deleteRow(this)"><i class="bi bi-x-square-fill"></i></button>
            <div class="desc-inputs">
                <input class="mb-2" type="text" placeholder="item Description">
                <textarea name="" id="" rows="4" placeholder="Additional Details"></textarea>
            </div>
        </div>
        <div class="content-rate">
            <p>Rate</p>
            <input class="value1" type="number" id="rate-${rowIndex}" oninput="calculateAmount(${rowIndex},${rowIndex},${rowIndex})" placeholder="00" value="00" required>
        </div>
        <div class="content-qty">
            <p>Quantity</p>
            <input class="value2" type="number" id="qty-${rowIndex}" oninput="calculateAmount(${rowIndex},${rowIndex},${rowIndex})" placeholder="0" value="1" required>
        </div>
        <div class="content-amount">
            <input class="" type="text" id="result-${rowIndex}" placeholder="00" value="00" disabled>
        </div>
    </div>
    <hr>
    `
    mainContainer.appendChild(row);
    rowIndex++;
}

// delete data
function deleteRow(button) {
    const row = button.closest('.row-item');
    if (row) row.remove();
    rowIndex--;
}

// share link
function sharePage() {
    const shareData = {
      title: document.title,
      text: "Check out this page:",
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Page shared successfully!'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Failed to copy link', err));
    }
}


// calculate total amount
function calculateTotalAmount(selectedCurrency) {
    const rows = document.querySelectorAll('.row-item')
    let total = 0;

    rows.forEach(row => {
        const value1 = parseFloat(row.querySelector('.value1').value) || 0;
        const value2 = parseFloat(row.querySelector('.value2').value) || 0;

        amount = value1 * value2;
        total += amount

        document.getElementById('totalamount').textContent = `${selectedCurrency} ${total}`;
    })
}

// display logo
(() => {
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    const inputDiv = document.querySelector('.invoice-logo-div');
    const imagelogo = document.querySelector('.imagelogo');

    const savedLogo = localStorage.getItem("invoiceLogo");

    if(savedLogo) {
        preview.src = savedLogo;
        preview.style.display = 'flex';
        imagelogo.style.display = "none";
    }

    imageInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function () {
          imageData = reader.result;
          preview.src  = imageData
          preview.style.display = 'flex';
          imagelogo.style.display = "none";

          // store 
          localStorage.setItem("invoiceLogo", imageData);
        });

        reader.readAsDataURL(file);
      }
    });
})()


// delete invoice logo
function removeLogo() {
    const btn = document.getElementById('logodelete');
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    const imagelogo = document.querySelector('.imagelogo');

    const logo = localStorage.getItem("invoiceLogo");
    
    if (logo) {
        // Show the saved logo on page load
        preview.src = logo;
        preview.style.display = 'flex';
        imagelogo.style.display = "none";
    }

    

    // Always attach the click listener
    btn.addEventListener("click", () => {
        localStorage.removeItem("invoiceLogo"); // Delete logo from storage
        imageInput.value = ""; // Clear file input
        preview.src = ""; // Clear preview image
        preview.style.display = "none";
        imagelogo.style.display = "block"; // Show placeholder again
    });

}


// save user from data
(() => {

    const fromName = document.getElementById('from-name');
    const fromPhone = document.getElementById('from-phone');
    const fromEmail = document.getElementById('from-email');
    const fromAddress = document.getElementById('from-address');
    const fromCity = document.getElementById('from-city');
    const fromTin = document.getElementById('from-tin');

    const fields = [fromName, fromPhone, fromEmail, fromAddress, fromCity, fromTin];

    fields.forEach((field) => {
        const savedValue = localStorage.getItem(field.id);
        if (savedValue) {
            field.value = savedValue;
        }

        // Save to localStorage on input
        field.addEventListener("input", () => {
            localStorage.setItem(field.id, field.value);
        });
    });

    // show todays date
    const dateInput = document.getElementById('to-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;


})()


// write invoice data
document.addEventListener("DOMContentLoaded",() => {

    //const preview = document.getElementById('invoicePreview');
    const previewBtn = document.getElementById('downloadpdf');

    previewBtn.addEventListener("click", ()=> {
        
        //preview.style.display = "flex";

        const invoiceName = document.getElementById('invoiceName').value || "";
        const businessName = document.getElementById('from-name').value || "";
        const businessEmail = document.getElementById('from-email').value || "";
        const businessAddress = document.getElementById('from-address').value || "";
        const businessStreet = document.getElementById('from-city').value || "";
        const businessPhone = document.getElementById('from-phone').value || "";
        const businessTIN = document.getElementById('from-tin').value || "";
        const billToName = document.getElementById('to-name').value || "";
        const billToAddress = document.getElementById('to-address').value || "";
        const billToEmail = document.getElementById('to-email').value || "";
        const billToPhone = document.getElementById('to-phone').value || "";
        const billDate = document.getElementById('to-date').value || "";

        const savedLogo = localStorage.getItem("invoiceLogo");

        // new data
        document.getElementById('newInvoiceName').textContent = invoiceName;
        document.getElementById('newName').textContent = businessName;
        document.getElementById('newEmail').textContent = businessEmail;
        document.getElementById('newAddress').textContent = businessStreet.trim() !== "" ? `${businessStreet}, ${businessAddress}` : businessAddress;
        document.getElementById('newPhone').textContent = businessPhone;
        document.getElementById('newTIN').textContent = businessTIN;
        document.getElementById('newBillTo').textContent = billToName;
        document.getElementById('newBillAddress').textContent = billToAddress;
        document.getElementById('newBillEmail').textContent = billToEmail;
        document.getElementById('newBillPhone').textContent = billToPhone;
        document.getElementById('newBillDate').textContent = billDate;

        // total
        document.getElementById('newTotal').textContent = document.getElementById('totalamount').textContent
        document.getElementById('dueBalance').textContent = document.getElementById('totalamount').textContent

        // style
        document.getElementById('businessNo').style.display = businessTIN.trim() === "" ? "none" : "flex";
        document.getElementById('newEmailDiv').style.display = billToEmail.trim() === "" ? "none" : "flex";
        document.getElementById('newPhoneDiv').style.display = billToPhone.trim() === "" ? "none" : "flex";
        
        if (savedLogo) {document.getElementById("newLogo").src = savedLogo;}

        // list
        const previewContainer = document.getElementById("previewItems");
        previewContainer.innerHTML = ""; 

        // Get all rows dynamically
        const rows = document.querySelectorAll("#calculations-div .row-item");

        rows.forEach((row, index) => {
            const itemDesc = row.querySelector("input[type='text']")?.value || "";
            const details = row.querySelector("textarea")?.value || "";
            const rate = row.querySelector(".value1")?.value || "0";
            const qty = row.querySelector(".value2")?.value || "0";
            const total = row.querySelector("#result-" + (index + 1))?.value || "0";

            // Build clean row for preview
            const itemBlock = document.createElement("div");
            itemBlock.className = "list-item";
            itemBlock.innerHTML = `
            <div class="inner-content-item mt-2 mb-2">
                <div class="inner-description">
                    <p class="inner-desc-title">${itemDesc}</p>
                    ${details ? `<p class="inner-desc-desc mt-1 mb-1">${details}</p>` : ""}
                </div>
                <div class="inner-rate"><p>${rate}</p></div>
                <div class="inner-qty"><p>${qty}</p></div>
                <div class="inner-amount"><p>${total}</p></div>
            </div>
            <hr>
            `;

            previewContainer.appendChild(itemBlock);
        });


        // download pdf
        downloadInvoicePDF();

        

    })

    

})







function downloadInvoicePDF() {
  const element = document.getElementById('invoice');
  const invoiceName = document.getElementById('invoiceName').value || "";

  //element.style.width = '794px';
  element.style.padding = '40px'; // Adjust for nice inner spacing

  const options = {
    margin: 0,
    filename: invoiceName.trim() !== "" ? `${invoiceName}.pdf` : 'invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true, // Allow images/logos to render
      backgroundColor: '#ffffff'
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  };

  html2pdf().set(options).from(element).save();
}





//   const overlay = document.getElementById('invoice-overlay');
//   const popupContent = document.getElementById('popup-content');

//   // Collect values
//   const fromName = document.getElementById('from-name').value;
//   const fromEmail = document.getElementById('from-email').value;
//   const fromAddress1 = document.getElementById('from-address').value;
//   const fromAddress2 = document.getElementById('from-city').value;
//   const fromPhone = document.getElementById('from-phone').value;
//   const fromTin = document.getElementById('from-tin').value;

//   const billName = document.getElementById('bill-name').value;
//   const billEmail = document.getElementById('bill-email').value;
//   const billAddress = document.getElementById('bill-address').value;
//   const billPhone = document.getElementById('bill-phone').value;
//   const billDate = document.getElementById('bill-date').value;

//   const description = document.getElementById('item-description').value;
//   const details = document.getElementById('item-details').value;
//   const rate = document.getElementById('item-rate').value;
//   const quantity = document.getElementById('item-quantity').value;
//   const amount = document.getElementById('item-amount').value;
//   const total = document.getElementById('total-amount').innerText;












