function validateForm(event) {
    event.preventDefault(); // Zatrzymaj domyślną akcję przesyłania formularza
  
    var nickInput = document.getElementById('nick');
    var nickValue = nickInput.value;
  
    // Sprawdzenie długości nicku
    if (nickValue.length < 3) {
      document.getElementById('error-msg').textContent = 'Nick musi składać się z co najmniej 3 znaków';
      return false;
    }
  
    // Sprawdzenie, czy nick zawiera polskie znaki
    if (/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(nickValue)) {
      document.getElementById('error-msg').textContent = 'Nick nie może zawierać polskich znaków';
      return false;
    }
  
    var emailInput = document.getElementById('email');
    var emailValue = emailInput.value;
  
    // Sprawdzenie, czy email ma poprawny format
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailValue)) {
      document.getElementById('error-msg').textContent = 'Podany adres e-mail jest niepoprawny';
      return false;
    }
  
    // Pozostała walidacja daty urodzenia (jak w poprzednim przykładzie)
    var dobInput = document.getElementById('dob');
    var dobValue = dobInput.value;
    var currentDate = new Date();
    var inputDate = new Date(dobValue);
  
    if (inputDate >= currentDate) {
      document.getElementById('error-msg').textContent = 'niepoprawna data urodzenia';
      return false;
    }
  
    //tworzenie nowego wiersza w tabeli
    var table = document.querySelector('.results-table');
    var newRow = table.insertRow(table.rows.length);
  
    //dodawanie komórek do nowego wiersza
    var nickCell = newRow.insertCell(0);
    var emailCell = newRow.insertCell(1);
    var dobCell = newRow.insertCell(2);
    var timestampCell = newRow.insertCell(3);
    
    //ustawienie wartości komórek
    nickCell.textContent = nickValue;
    emailCell.textContent = emailValue;
    dobCell.textContent = dobValue;
    
    var timestamp = new Date();
    timestampCell.textContent=timestamp.toLocaleString();
    // czyszczenie zawartości formularza
    nickInput.value = '';
    emailInput.value = '';
    dobInput.value = '';
  
    // Jeśli wszystkie walidacje zostaną zaliczone
    return true;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    var myForm = document.getElementById("myForm");
    myForm.onsubmit = validateForm;
  });
  
  
  function deleteLastRecord() {
    var resultsTable = document.querySelector('.results-table');
    // Sprawdź, czy tabela ma co najmniej jeden wiersz (nagłówek nie jest brany pod uwagę)
    if (resultsTable.rows.length > 1) {
      resultsTable.deleteRow(resultsTable.rows.length - 1);
    } else {
      alert("Brak rekordów do usunięcia.");
    }
  }