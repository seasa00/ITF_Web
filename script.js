// ====== ITF Simple Bank ======
// Helper สำหรับ query element ง่ายๆ
const $ = (q) => document.querySelector(q);

// ดึง element หลัก
const display = $("#display");
const accountInput = $("#account-amount");
const cashInput = $("#cash-amount");
const opType = $("#op-type");
const opValue = $("#op-value");
const btnChange = $("#btn-change");
const btnProceed = $("#btn-proceed");

let line = 0; // นับบรรทัด log

// ---- ฟังก์ชัน log ----
function log(msg) {
  line += 1;
  const text = `${line}, ${msg}`;
  display.value = (display.value ? display.value + "\n" : "") + text;
  display.scrollTop = display.scrollHeight; // scroll ลงอัตโนมัติ
}

// ---- แสดงยอดปัจจุบัน ----
function snapshot() {
  const acc = Number(accountInput.value) || 0;
  const cash = Number(cashInput.value) || 0;
  log(`Current account balance: ${acc}, Current cash balance: ${cash}`);
}

// ---- ปุ่ม Change ----
btnChange.addEventListener("click", snapshot);

// ---- ปุ่ม Proceed ----
btnProceed.addEventListener("click", () => {
  const type = opType.value;
  const amount = Number(opValue.value);

  if (!amount || amount <= 0) {
    log("❌ Invalid amount. Please enter a valid number.");
    return;
  }

  let acc = Number(accountInput.value) || 0;
  let cash = Number(cashInput.value) || 0;

  if (type === "deposit") {
    if (cash < amount) {
      log(`❌ Deposit failed: Not enough cash (${cash} < ${amount})`);
      return;
    }
    cash -= amount;
    acc += amount;
    log(`✅ Deposit ${amount} THB completed.`);
  } else if (type === "withdraw") {
    if (acc < amount) {
      log(`❌ Withdraw failed: Not enough balance (${acc} < ${amount})`);
      return;
    }
    acc -= amount;
    cash += amount;
    log(`✅ Withdraw ${amount} THB completed.`);
  }

  // อัปเดตค่า
  accountInput.value = acc;
  cashInput.value = cash;

  // แสดงยอดล่าสุด
  snapshot();

  // เคลียร์ช่องกรอก
  opValue.value = "";
});

// ---- แสดงยอดตอนเปิดหน้าเว็บ ----
snapshot();
