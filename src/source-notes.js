export const sourceCorrections=[
['arithmetic','Lect2 · p.32','addi uses a signed 12-bit immediate (−2048..2047), not the 11-bit range shown in the slide.','الـImmediate في addi هي signed 12-bit ومجالها −2048..2047؛ الرقم والمدى في الشريحة محتاجين تصحيح.'],
['registers','Lect2 · p.25 / Lab02 · p.9','Saved registers are x8=s0, x9=s1, and x18..x27=s2..s11: 12 registers in total.','المجموعة الكاملة تشمل x8 أيضًا. x9 مع x18..x27 فقط عددهم 11، وليس 12.'],
['load-store','Lab02 · p.16','sd stores a register value into memory. The example caption reverses the transfer direction.','sd تنقل القيمة من Register إلى Memory؛ العبارة المكتوبة بجوار المثال عاكسة الاتجاه.'],
['load-store','Lab02 · p.10','Natural alignment is useful; misaligned-access support or traps depend on the execution environment.','الوصول Misaligned مش ممنوع في كل نظام؛ دعمه أو حدوث Trap يعتمد على Execution Environment.'],
['formats','Lab02 · pp.12, 18','Include U-type among the formats. Base instructions are 32 bits; the C extension adds 16-bit compressed instructions.','U-type موجودة ضمن الصيغ. عرض Register في RV64 مش هو طول التعليمة، وC extension ممكن تضيف تعليمات 16-bit.'],
['cpu-cycle','Lect1 · pp.28–30','General CPU status flags are not a base RISC-V condition-code register. PC updates depend on instruction length and control flow.','رسم الـFlags نموذج عام لبعض المعالجات؛ ما نفترضش وجوده في Base RISC-V. الـPC يتغير حسب طول التعليمة والـBranch أو Jump.'],
['binary','Lect2 · p.33','The unsigned 64-bit maximum is 18,446,744,073,709,551,615 = 2^64−1.','أقصى Unsigned 64-bit هو 2^64−1؛ الرقم المكتوب في الشريحة فيه خطأ مطبعي.'],
['lab-tasks','Lab02 · p.20','B’s element type is unspecified. State whether the solution assumes words or doublewords.','حجم عناصر B غير محدد. لازم تقول افتراضك لأن Word وDoubleword يحتاجوا Offsets وتعليمات مختلفة.'],
['assembly-basics','Lab01 · p.21','mul requires multiplication support such as M; nop does not return; the power example assumes a nonnegative exponent.','mul تحتاج دعم الضرب. nop لا تنفذ Return، ومثال power يفترض أن الأس عدد صحيح غير سالب.']
];
