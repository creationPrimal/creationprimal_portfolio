
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
        const notes = document.getElementById('notes').value || "";

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
        document.getElementById('newNotes').textContent = notes;

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
//   const invoicePreview = document.getElementById('invoicePreview');
  const invoiceName = document.getElementById('invoiceName').value || "";


  //element.style.width = '794px';
  element.style.padding = '40px'; // Adjust for nice inner spacing
//   invoicePreview.style.display = 'flex'; // show the preview div so to capture data
//   invoicePreview.style.left = '-9999px';

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
//   invoicePreview.style.display = 'none'; // remove the preview btn
  // alert user
  alert('Your Invoice has been Created successfully, Press "Ok" to download it. Thank you for using our tool. 😊🫶❤️')
}





// display instructions on small screen
(()=>{
    const smallscreendiv = document.querySelector('.smallscreeninstruct');

    smallscreendiv.innerHTML = 
        `
        <div class="smallinstruct" id="smallinstruct">
            <h4>How To Use Our Free Invoice Generator</h4>
            <p>These step by step instructions will show you how to create an invoice that includes all the standard elements of a 
                professional invoice. Below, we'll dive into how you can customize a generic invoice to be unique to your business.
            </p>
            <p class="mt-2 mb-3">The first time you create an invoice, you'll need to add some information to the blank invoice template.</p>
            <p class="mb-2">1. Add your company details in the <b>From section</b>, including the name, phone number, and address</p>
            <p class="mb-2">2. Fill out your client's details in the <b>For section</b>, including name, email, and address</p>
            <p class="mb-2">3. Add each line item, along with a description, rate, and quantity</p>
            <p class="mb-2">4. If applicable, enter the tax rate, type of currency, and discount amount</p>
            <p class="mb-2">5. Write payment instructions and terms in <b>Notes</b> section</p>
            <p class="mb-2">6. Customize your invoice by adding a logor</p>

            <h4 class="mt-4">How To Download Invoice</h4>
            <p>Your invoice is all set! To keep a copy, just click the Download button and save it as a PDF. 
                You can send it to your clients, print it, or store it for later. 
                <br> <br>
                Want to help others? Share the link so your friends or team can try out our free Invoice Generator and make their 
                own invoices in just a few clicks.
            </p>

            <h4 class="mt-4">Our Free Invoice Generator Saves You Time</h4>
            <p class="mt-2 mb-3">When you use our invoice generator you save yourself a lot of time and effort. Here are some of the reasons why:
            </p>
            <p class="mb-2">1. Automatically save your clients and items so they're available the next time you're writing an invoice</p>
            <p class="mb-2">2. Organize your invoices in seconds</p>
            <p class="mb-2">3. Use a professionally designed template that's compatible with printers and mobile devices</p>
            <p class="mb-2">4. See a full overview of your business effortlessly and in moments</p>
            <p class="mb-2">5. Know when your business invoice is viewed by a customer</p>
            <p class="mb-2">6. Process credit cards online or on location</p>

            <h4 class="mt-4">Why is Our Invoice Generator Free</h4>
            <p>We decided to make our Invoice Generator free for everyone because we believe every business, freelancer, and entrepreneur 
                should have access to simple tools that help them save time and money. Our goal is to empower you to create professional invoices 
                without extra costs, so you can focus on growing your business.
            </p>

            <hr>
            <p class="copyrightbelow mb-5 mt-2">2025 © All Rights reserved. Developed and maintained by: <a href="mailto: creationprimal@gmail.com"><b>Creation Primal</b></a></p>
        </div>
        `
})()




// redirect user to login page
document.addEventListener("DOMContentLoaded", () => {
    const innerbox = document.querySelector('.requirelogin');
    // redirect to login and save the route user was in before
    innerbox.addEventListener("click", () => {
        localStorage.setItem("redirectAfterLogin", window.location.href);
        window.location.href = "login.html";        
    })

})


// show cookies pop up
document.addEventListener("DOMContentLoaded", () => {

    const box = document.querySelector('.cachepopup');
    
    box.innerHTML = 
    `
    <hr class="mt-1 mb-4">
    <div class="cachebox" id="popcache">
        <div class="popupicons">
        <img src="assets/images/icons/cookies.png" alt="">
        </div>
        <p class="title">We Use Cookies.</p>
        <p class="body">
            This website uses cookies to ensure you get the best experience on our site.
       </p>
        <div class="cachebtns">
            <button class="cookieaccept" id="acceptBtn">Got it!</button>
            <button class="cookiedecline" id="declineBtn">Decline</button>
        </div>
    </div>

    <div class="cachebox mt-3" id="popad">
        <div class="popupicons">
            <img src="assets/images/icons/needwebsite.png" alt=""> 
            <img src="assets/images/icons/appstore.png" alt="">
            <img src="assets/images/icons/playstore.png" alt="">
        </div>
        <p class="title">Need a Software?</p>
        <p class="body">
            We design and build websites and mobile apps — check us out if you're interested!
       </p>
        <div class="cachebtns">
             <a href="mailto: creationprimal@gmail.com"><button class="cookieaccept">Contacts</button></a>
            <a href="index.html" target="_blank" rel="noopener noreferrer"><button class="cookiedecline adexplore">Explore</button></a>
        </div>
    </div>
    `

    const popCache = document.getElementById('popcache');
    const popAd = document.getElementById('popad');
    const acceptBtn = document.getElementById('acceptBtn');
    const declineBtn = document.getElementById('declineBtn');

    // Show only if user hasn’t made a choice before
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== null) {
        popCache.style.display = 'none';
    }

    // Handle Accept
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        popCache.style.display = 'none'; // Hide popup
    });

    // Handle Decline
    declineBtn.addEventListener('click', () => {
        const confirmDecline = confirm("Are you sure you want to decline cookies? Some features may not work without them. 🙄😢");

        if (confirmDecline) {
            // User confirmed decline
            localStorage.setItem('cookiesAccepted', 'false');
            popCache.style.display = 'none'; // Hide popup
            alert("You declined cookies. Some features may not work.");
        } else {
            // User canceled, treat as accepted
            localStorage.setItem('cookiesAccepted', 'true');
            popCache.style.display = 'none'; // Hide popup
            alert("Cookies accepted! Enjoy full functionality. 😊❤️");
        }
    });


    

})()






