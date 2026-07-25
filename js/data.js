const COUNTRIES = [
{ id:'us', name:'USA (Delaware)', flag:'🇺🇸', entity:'C-Corp', estDays:1, roof:0, office:'Delaware Division of Corporations, Dover', bs:'colonial', wc:'#f2efe6', rc:['#d9b23c','#ad8a1f'], src:[["Delaware Div. of Corporations - fees & expedite", "https://corp.delaware.gov/expserv/"], ["Franchise tax calculation methods", "https://corp.delaware.gov/frtaxcalc/"]],
  tag:"1 day, ~$400, online. No notary, no minimum capital, no bank certificate.",
  outro:"One day, online. Next March, a franchise-tax notice arrives: $85,165 under the default calculation. Recomputed under the other method the same law allows: about $450. The recomputation is your job. Foreign founders apply for their federal tax ID by fax.",
  steps:[
    { who:'Randy, Registered Agent', lines:[
      "Delaware. One million residents, 2.1 million registered companies.",
      "Every corporation needs a registered agent with a Delaware address. $50 a year. I receive your mail.",
      "You don't need to visit. Ever." ],
      cost:50, doc:'Registered Agent Agreement' },
    { who:'The Filing Website', lines:[
      "The Division of Corporations portal, last redesigned around 2004.",
      "Certificate of Incorporation: 10,000,000 authorized shares at $0.0001 par value. Filing fee: $89.",
      "Expedite options: next-day +$100. Same-day +$200. Two-hour +$500. One-hour +$1,000.",
      "*click* — approved." ],
      cost:289, wait:1, doc:'Certificate of Incorporation' } ] },

{ id:'at', name:'Austria', flag:'🇦🇹', entity:'GmbH', estDays:30, roof:1, office:'Firmenbuch — Landesgericht Wien', bs:'alpine', wc:'#f2ede2', rc:['#7a6a58','#5e5044'], src:[["WKO Gruenderservice / NeuFoeG", "https://www.wko.at/gruendung"], ["USP - GmbH-Gruendung offiziell", "https://www.usp.gv.at"]],
  tag:"€10,000 minimum capital (halved in 2024 — they're very proud). Do the steps in the WRONG ORDER and you forfeit the €493 fee waiver. Minimum tax: €500/year, even at zero revenue.",
  steps:[
    { who:'WKO Gründerservice', lines:[
      {t:"Grüß Gott! Zuerst holen Sie sich HIER die NeuFöG-Bestätigung. Damit erlassen wir Ihnen später rund €500 Gerichtsgebühren.", s:"Greetings! FIRST you collect the NeuFöG founder confirmation HERE. With it we later waive about €500 in court fees."},
      {t:"Aber Achtung: Machen Sie die Schritte in der falschen Reihenfolge, verfällt die Begünstigung. Rückwirkend gibt es nichts.", s:"But beware: do the steps in the wrong order and the waiver is forfeited. Nothing is retroactive."} ],
      doc:'NeuFöG-Bestätigung' },
    { who:'Notar Dr. Gruber', lines:[
      {t:"Eine österreichische GmbH! Mindestkapital seit 2024: nur noch €10.000. Wir haben es 2024 halbiert.", s:"An Austrian GmbH! Minimum capital since 2024: only €10,000. We halved it in 2024."},
      {t:"Ich lese Ihnen jetzt den Gesellschaftsvertrag vor. Den ganzen. Möchten Sie einen Verlängerten? Sie haben Zeit.", s:"I shall now read the articles of association to you. All of them. Would you like a Viennese coffee? You have time."} ],
      cost:1200, wait:10, san:8, doc:'Notariatsakt' },
    { who:'Bank Austria', lines:[
      {t:"€5.000 Stammkapital einzahlen, bitte. Alle Gesellschafter persönlich, mit Ausweis. Die Bankbestätigung wird getippt, gestempelt und noch einmal gestempelt.", s:"Deposit €5,000 share capital, please. All shareholders in person, with ID. The bank confirmation is typed, stamped, and stamped once more."},
      {t:"Warum zweimal? Der erste Stempel bestätigt den Brief. Der zweite bestätigt den ersten.", s:"Why twice? The first stamp validates the letter. The second validates the first."} ],
      capital:5000, wait:4, doc:'Bankbestätigung' },
    { who:'Firmenbuch (Landesgericht)', lines:[
      {t:"Das Landesgericht prüft nun Ihren Antrag. Die Eintragungsgebühr wäre €493 — dank Ihrer NeuFöG-Bestätigung: erlassen. Sie haben die Reihenfolge eingehalten. Respekt.", s:"The regional court now examines your application. The registration fee would be €493 — thanks to your NeuFöG confirmation: waived. You kept the correct order. Respect."} ],
      wait:12, doc:'Firmenbuchauszug' },
    { who:'GISA (Gewerbeanmeldung)', lines:[
      {t:"Die Gewerbeanmeldung geht erst JETZT — sie braucht den Firmenbuchauszug. Das Firmenbuch brauchte die Bank, die Bank den Notar. Eine schöne, ordentliche Einbahnstraße.", s:"The trade registration is only possible NOW — it needs the register excerpt. The register needed the bank, the bank needed the notary. A lovely, orderly one-way street."} ],
      wait:3, doc:'GISA-Auszug' },
    { who:'Finanzamt & WKO', lines:[
      {t:"Ihre Steuernummer kommt in ein paar Wochen. Bis dahin eine gute Nachricht: Die Mindestkörperschaftsteuer beträgt €500 pro Jahr — auch bei null Umsatz.", s:"Your tax number arrives in a few weeks. Meanwhile, good news: the minimum corporate tax is €500 per year — even at zero revenue."},
      {t:"Und Sie sind jetzt Pflichtmitglied der Wirtschaftskammer. Pro Gewerbeberechtigung eine Grundumlage. Servus und willkommen!", s:"And you are now a mandatory member of the Economic Chamber. One base levy per trade licence. Servus and welcome!"} ],
      cost:650, wait:6, san:6, doc:'Steuernummer' } ] },

{ id:'be', name:'Belgium', flag:'🇧🇪', entity:'SRL / BV', estDays:10, roof:2, office:'Banque-Carrefour des Entreprises, Bruxelles', bs:'brick', wc:'#9a5a40', rc:['#4a4a52','#38383e'], src:[["Moniteur belge publication tariffs", "https://www.ejustice.just.fgov.be"], ["SPF Economie - guichets d'entreprises", "https://economie.fgov.be"]],
  tag:"No minimum capital! Instead: a legally mandated 2-year financial plan, kept sealed by the notary — and reopened only if you go bankrupt within 3 years, as evidence against you.",
  steps:[
    { who:'Comptable Mme Peeters', lines:[
      {t:"Bienvenue! Avant tout: le plan financier. La loi exige des projections sur deux ans — bilans, comptes de résultats, budget de trésorerie sur 24 mois. Contenu fixé par l'article 5:4 du Code.", s:"Welcome! Before anything: the financial plan. The law requires two-year projections — balance sheets, P&L, a 24-month cash budget. Contents fixed by Article 5:4 of the Code."},
      {t:"Personne ne peut prédire deux ans. Tout le monde doit. Écrivez quelque chose de plausible.", s:"Nobody can predict two years. Everyone must. Write something plausible."},
      {t:"Le notaire le garde scellé. On ne le rouvre que si vous faites faillite dans les trois ans — comme preuve CONTRE vous.", s:"The notary keeps it sealed. It is reopened only if you go bankrupt within three years — as evidence AGAINST you."} ],
      cost:500, san:6, doc:'Plan financier (fiction)' },
    { who:'Notaire Van Damme', lines:[
      {t:"L'acte notarié, obligatoire. Une question d'abord, très belge:", s:"The notarial deed, mandatory. But first a question, a very Belgian one:"} ],
      choice:{ prompt:{t:"L'acte: en français ou en néerlandais?", s:"The deed: in French or in Dutch?"}, options:[
        { label:"En français, s'il vous plaît",
          reply:{t:"Très bien. Le tarif est identique dans les deux langues.", s:"Very well. The tariff is identical in both languages."} },
        { label:"In het Nederlands, alstublieft",
          reply:{t:"Uitstekend! Het tarief is in beide talen gelijk.", s:"Excellent! The tariff is the same in both languages."} } ] },
      cost:1000, wait:5, doc:'Acte constitutif' },
    { who:'Moniteur belge', lines:[
      {t:"La publication au Moniteur belge: €272. Le prix d'exister est indexé et augmente chaque 1er mars.", s:"Publication in the official gazette: €272. The price of existing is indexed and rises every March 1st."} ],
      cost:272, wait:2, doc:'Publication au Moniteur' },
    { who:"Guichet d'entreprises", lines:[
      {t:"Inscription à la Banque-Carrefour: €105,50. Tous les guichets 'concurrents' facturent exactement le même tarif fixé par l'État.", s:"Registration with the Crossroads Bank: €105.50. All the 'competing' counters charge exactly the same state-set fee."},
      {t:"Votre numéro de TVA existe déjà — mais il est mort. Pour l'activer: le formulaire e604A. Gratuit en ligne. Ou €90 si NOUS appuyons sur le bouton pour vous.", s:"Your VAT number already exists — but it is dead. To activate it: form e604A. Free online. Or €90 if WE press the button for you."} ],
      cost:195, wait:3, doc:"Numéro d'entreprise" },
    { who:'Registre UBO', lines:[
      {t:"Déclarez vos bénéficiaires effectifs dans les 30 jours. Puis reconfirmez chaque année que rien n'a changé. Même si rien n'a changé. SURTOUT si rien n'a changé.", s:"Declare your beneficial owners within 30 days. Then reconfirm every year that nothing changed. Even if nothing changed. ESPECIALLY if nothing changed."} ],
      wait:2, doc:'Déclaration UBO' } ] },

{ id:'bg', name:'Bulgaria', flag:'🇧🇬', entity:'EOOD', estDays:7, roof:3, office:'Агенция по вписванията — Търговски регистър, София', bs:'plaster', wc:'#e8c8b0', rc:['#b0563c','#8a3f2a'], src:[["Registry Agency portal", "https://portal.registryagency.bg"], ["Registry Agency", "https://www.registryagency.bg"]],
  tag:"Capital: €1. The bank account needed to deposit it: €30 — then it gets closed after registration and you redo the KYC. The EU's most affordable ambition.",
  steps:[
    { who:'Банков служител', lines:[
      {t:"Минимален капитал: 1 евро. За да го внесете, откриваме специална набирателна сметка. Такса за откриване: 30 евро.", s:"Minimum capital: €1. To deposit it, we open a special capital-raising account. Opening fee: €30."},
      {t:"Ето ви тържественото банково удостоверение, че сте внесли един евро. Без него регистрацията е невъзможна. Пазете го.", s:"Here is your solemn bank certificate confirming that you deposited one euro. Without it, registration is impossible. Guard it."} ],
      cost:30, capital:1, wait:2, doc:'Банково удостоверение (€1)' },
    { who:'Нотариус', lines:[
      {t:"Спесимен от подписа на управителя — с мокро мастило, нотариално заверен. Да, самото подаване после е електронно. Не, не виждаме противоречие.", s:"A wet-ink, notarized specimen of the manager's signature. Yes, the filing afterwards is electronic. No, we see no contradiction."} ],
      cost:6, doc:'Нотариален спесимен' },
    { who:'Търговски регистър', lines:[
      {t:"Електронно подаване: €28,12. На хартия: €56,24. Точно двойно.", s:"E-filing: €28.12. On paper: €56.24. Exactly double."},
      {t:"Регистрирано! ЕИК издаден. Сега затворете набирателната сметка и отворете истинска — с изцяло ново KYC, разбира се.", s:"Registered! Company ID issued. Now close the capital-raising account and open a real one — with entirely fresh KYC, of course."} ],
      cost:28, wait:4, san:4, doc:'ЕИК номер' } ] },

{ id:'hr', name:'Croatia', flag:'🇭🇷', entity:'d.o.o.', estDays:15, roof:4, office:'Trgovački sud u Zagrebu — Sudski registar', bs:'medit', wc:'#f0e6d2', rc:['#c0563a','#96422c'], src:[["HITRO.HR", "https://www.hitro.hr"], ["START online formation", "https://start.gov.hr"]],
  tag:"The one-stop shop is named HITRO — 'fast'. It has six stops, and its own website admits it does not replace the notary.",
  steps:[
    { who:'Porezna uprava', lines:[
      {t:"Prvo OIB — osobni identifikacijski broj. Za svakog osnivača i svakog direktora. Bez OIB-a u Hrvatskoj ništa ne počinje.", s:"First the OIB — personal identification number. For every founder and every director. Without an OIB, nothing in Croatia begins."} ],
      wait:2, doc:'OIB' },
    { who:'Javni bilježnik', lines:[
      {t:"Svi osnivači osobno, s ovlaštenim sudskim tumačem ako ne govorite hrvatski. Pečat. Potpis. Pečat.", s:"All founders in person, with a certified court interpreter if you don't speak Croatian. Stamp. Signature. Stamp."},
      {t:"Pečati su različitih oblika. Svaki oblik ima značenje. Značenje je €450.", s:"The stamps come in different shapes. Each shape has meaning. The meaning is €450."} ],
      cost:450, wait:4, san:5, doc:'Osnivački akt' },
    { who:'HITRO.HR šalter', lines:[
      {t:"Dobrodošli u HITRO.HR — 'hitro' znači 'brzo'! Mi smo šalter 'sve na jednom mjestu'.", s:"Welcome to HITRO.HR — 'hitro' means 'fast'! We are the 'everything in one place' counter."},
      {t:"Dakle: prvo bilježnik, pa naša blagajna, pa sud, pa statistika, pa banka, pa porezna. Šest stanica. Ali sve na jednom mjestu! Više-manje.", s:"So: first the notary, then our till, then the court, then statistics, then the bank, then the tax office. Six stops. But all in one place! More or less."} ],
      cost:30, san:5, doc:'HITRO predmet' },
    { who:'Trgovački sud', lines:[
      {t:"Sud registrira vaš d.o.o. Temeljni kapital: €2.500. I trebat će vam pečat tvrtke — €30. Nijedan zakon ga ne traži, ali svi ga traže.", s:"The court registers your d.o.o. Share capital: €2,500. And you'll need a company seal — €30. No law requires it, yet everyone demands it."} ],
      capital:2500, cost:40, wait:6, doc:'Rješenje o upisu' },
    { who:'HGK', lines:[
      {t:"Automatski ste član Hrvatske gospodarske komore. Obavezno. Dobra vijest: članarina je sada €0.", s:"You are automatically a member of the Chamber of Economy. Mandatory. Good news: the fee is now €0."},
      {t:"Reforma znači: besplatno plaćate članstvo koje ne možete odbiti. Dobrodošli!", s:"Reform means: you pay nothing for the membership you cannot refuse. Welcome!"} ],
      wait:2, doc:'HGK članstvo' } ] },

{ id:'cy', name:'Cyprus', flag:'🇨🇾', entity:'LTD', estDays:25, roof:5, office:'Έφορος Εταιρειών (Registrar of Companies), Λευκωσία', bs:'white', wc:'#f4f1e8', rc:['#3f6fb5','#2d5390'], src:[["Registrar of Companies - incorporation", "https://www.companies.gov.cy/en/"], ["Annual levy abolished 2024", "https://www.harneys.com/our-blogs/regulatory/cyprus-abolishes-annual-company-levy-to-support-business-community/"]],
  tag:"DIY incorporation is legally impossible — only a Cyprus advocate may swear the founding declaration. Your constitution will be in Greek, whether you read Greek or not.",
  steps:[
    { who:'Δικηγόρος Ανδρέου', lines:[
      {t:"Στην Κύπρο, τη δήλωση ΗΕ1 που ιδρύει εταιρεία την υπογράφει ένορκα μόνο δικηγόρος. Να την καταθέσετε μόνος σας; Δεν είναι απλώς ασύνετο — είναι νομικά αδύνατο.", s:"In Cyprus, the HE1 declaration that founds a company may only be sworn by a practising advocate. Filing it yourself is not merely unwise — it is legally impossible."},
      {t:"Η αμοιβή μου: €1.200. Περιλαμβάνει φιλοξενία. Ο καφές είναι εξαιρετικός και το τιμολόγιο αληθινό.", s:"My fee: €1,200. It includes hospitality. The coffee is excellent and the invoice is real."} ],
      cost:1200, san:5, doc:'Συμφωνία ανάθεσης' },
    { who:'Έγκριση ονόματος', lines:[
      {t:"Ο Έφορος εξετάζει το όνομά σας για μοναδικότητα, ευπρέπεια και — πώς να το θέσουμε — αίσθηση. Οι λόγοι απόρριψης δεν γνωστοποιούνται πάντα.", s:"The Registrar reviews your name for uniqueness, decency and — how to put it — vibes. Rejection reasons are not always disclosed."},
      {t:"Η κανονική ουρά: εβδομάδες. Η ταχεία: €30. Όλοι πληρώνουν τα €30.", s:"The regular queue: weeks. The accelerated one: €30. Everyone pays the €30."} ],
      cost:30, wait:10, san:5, doc:'Έγκριση ονόματος' },
    { who:'Σύνταξη καταστατικού', lines:[
      {t:"Το ιδρυτικό έγγραφο και το καταστατικό συντάσσονται στα ΕΛΛΗΝΙΚΑ. Το απαιτεί ο νόμος. Διαβάζετε ελληνικά; Όχι;", s:"The Memorandum & Articles are drafted in GREEK. The law requires it. Do you read Greek? No?"},
      {t:"Αγγλική μετάφραση διατίθεται — με επιπλέον χρέωση. Θα κατέχετε ένα καταστατικό που δεν μπορείτε να διαβάσετε.", s:"An English translation is available — as a paid extra. You will own a constitution you cannot read."} ],
      cost:120, wait:3, san:4, doc:'Καταστατικό (στα ελληνικά)' },
    { who:'Έφορος Εταιρειών', lines:[
      {t:"Έντυπα ΗΕ1, ΗΕ2, ΗΕ3, τέλος €165, συν €100 για επίσπευση. Πιστοποιητικά: σύστασης, διευθυντών, μετόχων, εγγεγραμμένου γραφείου.", s:"Forms HE1, HE2, HE3, €165 fee, plus €100 acceleration. Certificates: of incorporation, of directors, of shareholders, of registered office."},
      {t:"Και κάτι ακόμη: κάθε κυπριακή εταιρεία χρειάζεται πλήρη ετήσιο έλεγχο. Για πάντα. Και οι ελεγκτές σερβίρουν εξαιρετικό καφέ.", s:"One more thing: every Cyprus company needs a full annual audit. Forever. The auditors also serve excellent coffee."} ],
      cost:265, wait:8, doc:'Πιστοποιητικό σύστασης' } ] },

{ id:'cz', name:'Czechia', flag:'🇨🇿', entity:'s.r.o.', estDays:16, roof:6, office:'Městský soud v Praze — Obchodní rejstřík', bs:'plaster', wc:'#efd9a8', rc:['#b0563c','#8a3f2a'], src:[["Obchodni rejstrik / justice.cz", "https://or.justice.cz"], ["Trade licence for a not-yet company", "https://en.brno.cz/w/trade-licence-for-czech-legal-persons-"]],
  tag:"The trade licence is issued to a company that doesn't exist yet, and expires if the company isn't born within 90 days. Minimum capital: 1 koruna. Statutory-minimum articles: court fee €0. Custom articles: CZK 2,700.",
  steps:[
    { who:'Majitel nemovitosti', lines:[
      {t:"Souhlas s umístěním sídla — s úředně ověřeným podpisem, ne starším tří měsíců. Tady máte razítko. Hlídejte si datum.", s:"Consent to your registered seat — with an officially certified signature, no older than three months. Here's your stamp. Watch the date."} ],
      cost:5, doc:'Souhlas vlastníka' },
    { who:'Rejstřík trestů', lines:[
      {t:"Výpis z trestního rejstříku pro jednatele. Cizinec? Apostila plus soudní překlad, ne starší 90 dnů.", s:"A criminal-record extract for the director. Foreigner? Apostille plus certified translation, no older than 90 days."} ],
      cost:60, wait:7, san:6, doc:'Výpis z rejstříku trestů' },
    { who:'Živnostenský úřad', lines:[
      {t:"Živnostenské oprávnění — pro firmu, která ještě neexistuje. Pokud se do 90 dnů nezaregistruje, oprávnění se vypaří.", s:"A trade licence — for a company that does not exist yet. If it isn't registered within 90 days, the licence evaporates."},
      {t:"Tisíc korun pokrývá všech osmdesát volných živností najednou. 'Vývoj softwaru' je volná živnost. Na rozdíl od kartářství — to je regulované. Skutečná kategorie.", s:"A thousand crowns covers all eighty free trades at once. 'Software development' is a free trade. Unlike fortune-telling — that one is regulated. Real category."} ],
      cost:40, wait:3, doc:'Živnostenské oprávnění' },
    { who:'Notář Novák',
      bounce:{ to:0,
        lines:[ {t:"Zakladatelská listina... moment. Váš souhlas vlastníka je starší tří měsíců. Proces trval příliš dlouho. Potřebuji čerstvý.", s:"The founding deed... one moment. Your landlord consent is older than three months. The process took too long. I need a fresh one."} ],
        visitLines:[ {t:"Zase vy? Dobře. Nové razítko, nový podpis, nové datum. Pozdravujte pana notáře.", s:"You again? Fine. New stamp, new signature, new date. Give my regards to the notary."} ],
        doc:'Souhlas vlastníka (čerstvý)', san:6,
        nag:{t:"Bez čerstvého souhlasu vlastníka nemohu sepsat zápis. Razítko nesmí být starší tří měsíců. Pravidla jsou pravidla.", s:"Without a fresh landlord consent I cannot draw up the record. The stamp must not be older than three months. Rules are rules."} },
      lines:[
      {t:"Výborně, čerstvé razítko! Notářský zápis. Minimální kapitál: jedna koruna. Symbolika je levná, můj honorář nikoli. Rovnováha.", s:"Excellent, a fresh stamp! The notarial record. Minimum capital: one crown. The symbolism is cheap; my fee is not. Balance."},
      {t:"A pokud jsou vaše stanovy maximálně nudné, zapíšu vás do rejstříku sám — ještě dnes, a soudní poplatek je NULA.", s:"And if your articles are maximally boring, I enter you into the register myself — today, and the court fee is ZERO."} ],
      cost:330, wait:2, doc:'Notářský zápis + zápis do OR' },
    { who:'Datová schránka', lines:[
      {t:"Stát vám automaticky zřídil datovou schránku. Nelze ji odmítnout. Úřední pošta se považuje za doručenou 10 dní po příchodu — i když ji nikdy neotevřete.", s:"The state has automatically created your data box. It cannot be refused. Official mail counts as delivered 10 days after arrival — even if you never open it."},
      {t:"Do 15 dnů se přihlaste k dani z příjmů. Přes datovou schránku, samozřejmě. Vítejte v Česku!", s:"Register for income tax within 15 days. Via the data box, of course. Welcome to Czechia!"} ],
      wait:2, san:4, doc:'Datová schránka' } ] },

{ id:'dk', name:'Denmark', flag:'🇩🇰', entity:'ApS', estDays:6, roof:7, office:'Erhvervsstyrelsen, København', bs:'nordic', wc:'#8a3f34', rc:['#3a3a40','#2a2a30'], src:[["Erhvervsstyrelsen - fees", "https://erhvervsstyrelsen.dk/gebyrer-og-takster"], ["Virk.dk", "https://virk.dk"]],
  tag:"Fully digital: Virk needs MitID, MitID needs a CPR number, a CPR number needs a Danish address.",
  steps:[
    { who:'MitID-skranken', lines:[
      {t:"Alt i Danmark er digitalt! Du skal bare bruge MitID. For at få MitID skal du have et CPR-nummer. For at få et CPR-nummer skal du have en dansk adresse. For at få en adresse... hm.", s:"Everything in Denmark is digital! You just need MitID. To get MitID you need a CPR number. To get a CPR number you need a Danish address. To get an address... hm."},
      {t:"Lad os bare sige, at det løser sig på nogle dage.", s:"Let's just say it resolves itself in a few days."} ],
      wait:4, san:5, doc:'MitID' },
    { who:'Advokaten', lines:[
      {t:"Kapitalen — 20.000 kroner — skal stå på selskabets konto. Selskabet findes ikke endnu, så banken siger nej. Løsningen: pengene tager en lur på MIN klientkonto. Mod et mindre honorar.", s:"The capital — DKK 20,000 — must sit in the company's account. The company doesn't exist yet, so the bank says no. The solution: the money naps in MY client account. For a modest fee."} ],
      cost:300, capital:2680, wait:2, doc:'Kapitalbekræftelse' },
    { who:'Virk.dk', lines:[
      {t:"Anmeldelse af ApS: 670 kroner. Ejere og reelle ejere angives i samme flow. Indsendt kl. 14:02.", s:"Filing the ApS: 670 kroner. Legal and beneficial owners declared in the same flow. Submitted at 14:02."},
      {t:"Godkendt kl. 14:03. CVR-nummer udstedt. Husk: et digitalt bogføringssystem er lovpligtigt — papirregnskab er reelt ulovligt. Hav en god dag.", s:"Approved at 14:03. CVR number issued. Remember: a digital bookkeeping system is required by law — paper ledgers are effectively illegal. Have a nice day."} ],
      cost:90, doc:'CVR-nummer' } ] },

{ id:'ee', name:'Estonia', flag:'🇪🇪', entity:'OÜ', estDays:50, roof:1, office:'Äriregister (RIK), Tallinn', bs:'nordic', wc:'#b0a890', rc:['#4a4a52','#38383e'], src:[["e-Residency - costs & timeline", "https://learn.e-resident.gov.ee"], ["e-Business Register (RIK)", "https://ariregister.rik.ee"]],
  tag:"15-minute online incorporation — after 6–8 weeks waiting for the physical ID card and an in-person fingerprint appointment.",
  outro:"Incorporation time: 15 minutes 33 seconds — the national record, set after a seven-week pilgrimage for a plastic card, plus a lifelong subscription to a licensed Estonian human. The e-state's own banks said no, so you bank abroad. Estonia is proud of you. The blockchain remembers.",
  steps:[
    { who:'e-Residency Desk', lines:[
      "Estonia is 100% digital! Apply for e-Residency online in 30 minutes. Fee: €150.",
      "Your DIGITAL identity card will be manufactured and shipped to a PHYSICAL pickup point. In six to eight weeks. You will collect it in person. We will take your fingerprints." ],
      cost:150, wait:42, san:8, doc:'e-Residency Card' },
    { who:'Contact Person Provider', lines:[
      "Management board abroad? Then the law requires a licensed Estonian contact person and street address. €300 a year. Forever.",
      "No, the subscription does not expire. Neither does Estonia." ],
      cost:300, doc:'Contact Person Contract' },
    { who:'e-Business Register', lines:[
      "Card inserted. PIN accepted. State fee: €265. Share capital: one cent per share — under €50,000 nobody checks. You pinky-promise the register that the cent was paid.",
      "Registered! Incorporation time: 15 minutes, 33 seconds. You beat the national average. Estonia is proud of you." ],
      cost:265, doc:'OÜ Registration' },
    { who:'The Banks', lines:[
      "LHV? No. Swedbank? No. SEB? Also no. The e-state's own banks decline e-residents daily.",
      "The official guidance now recommends... a foreign fintech." ],
      wait:5, san:6, doc:'Fintech Account' } ] },

{ id:'fi', name:'Finland', flag:'🇫🇮', entity:'Oy', estDays:12, roof:2, office:'Patentti- ja rekisterihallitus (PRH), Helsinki', bs:'nordic', wc:'#8a3f34', rc:['#3a3a40','#2a2a30'], src:[["PRH price list & 2026 paper ban", "https://www.prh.fi/en/price-lists"], ["Vero registers", "https://www.vero.fi"]],
  tag:"Share capital: €0 — but pay in even one euro and bank-proof requirements activate. Paper filing costs €140 more, and from 2026 is simply illegal. The silences are part of the process.",
  steps:[
    { who:'PRH nimipalvelu', lines:[
      {t:"Nimen on erotuttava selvästi kaikista muista. Varatkaa kolme vaihtoehtoa. Hylkäys lisää viikkoja.", s:"The name must be clearly distinguishable from all others. Prepare three backups. A rejection adds weeks."},
      {t:"Nyt: hiljaisuutta. Käsittelyä. Lisää hiljaisuutta. Tämä on normaalia. Tämä on Suomi.", s:"Now: silence. Processing. More silence. This is normal. This is Finland."} ],
      wait:2, doc:'Nimiehdotus' },
    { who:'YTJ-portaali', lines:[
      {t:"Osakepääoma: nolla euroa. Täysin laillista. Mutta jos maksatte edes yhden euron, tarvitaan pankkitodistus. Nolla on helpompi. Suosittelemme nollaa.", s:"Share capital: zero euros. Perfectly legal. But if you pay in even one euro, bank proof is required. Zero is easier. We recommend zero."},
      {t:"Ilmoitus verkossa: €240. Paperilla: €380 — ja vuodesta 2026 paperi on yhtiöille kokonaan kielletty. Sama lomake, eri hinta, pian rikkomus.", s:"Filing online: €240. On paper: €380 — and from 2026 paper is entirely forbidden for companies. Same form, different price, soon an offence."} ],
      cost:240, wait:5, doc:'Kaupparekisteriote' },
    { who:'Vero', lines:[
      {t:"Ennakkoperintärekisteri, ALV-rekisteri, työnantajarekisteri. Kolme rekisteriä, yksi sielu.", s:"The prepayment register, the VAT register, the employer register. Three registers, one soul."},
      {t:"Ilman ennakkoperintärekisteriä asiakkaanne joutuvat pidättämään verot teidän laskuistanne. Kyllä, teidän laskuistanne.", s:"Without the prepayment register, your clients must withhold tax from your invoices. Yes, from YOUR invoices."} ],
      wait:3, doc:'Verorekisteröinnit' },
    { who:'PRH edunsaajat', lines:[
      {t:"Ilmoittakaa tosiasialliset edunsaajanne. Ilmaista. Hiljaisuus maksaa €300, ja lopulta poistamme teidät rekisteristä.", s:"Declare your beneficial owners. Free. Silence costs €300, and eventually we remove you from the register."} ],
      wait:2, san:4, doc:'Edunsaajailmoitus' } ] },

{ id:'fr', name:'France', flag:'🇫🇷', entity:'SAS', estDays:21, roof:3, office:'Greffe du Tribunal de commerce de Paris', bs:'mansard', wc:'#e8e0d0', rc:['#5a6478','#454e60'], src:[["JAL tariff by ministerial decree", "https://entreprendre.service-public.gouv.fr/actualites/A17978"], ["INPI Guichet Unique", "https://procedures.inpi.fr"]],
  tag:"Your startup must debut in a printed newspaper — tariff fixed by ministerial decree. The mandatory one-stop portal launched so broken the state legalized an official backup procedure for it.",
  outro:"You hold the sacred Kbis. In France this scroll opens every door — and every door will demand it again, freshly reprinted, never older than three months. Your capital was frozen the whole time, waiting for the Kbis that needed the capital. A perfect circle. A French circle.",
  steps:[
    { who:'Maître Dubois, avocat', lines:[
      {t:"Nous allons rédiger vos statuts. Du français formel, magnifique. Soixante pages.", s:"We shall draft your statuts. Formal, magnificent French. Sixty pages."},
      {t:"Vous parapherez chacune d'elles. Votre main apprendra l'humilité.", s:"You will initial every one of them. Your hand will learn humility."} ],
      cost:600, wait:3, doc:'Statuts (60 pages)' },
    { who:'La Banque', lines:[
      {t:"Nous bloquons votre capital jusqu'à l'immatriculation. Vous voulez votre argent? Il faut le Kbis. Le Kbis? Il faut d'abord déposer l'argent.", s:"We block your capital until registration. You want your money? You need the Kbis. The Kbis? First, deposit the money."} ],
      capital:1000, wait:4, doc:'Certificat de dépôt' },
    { who:"Journal d'annonces légales", lines:[
      {t:"La loi exige d'annoncer la naissance de votre société dans la presse. Oui, un JOURNAL. En papier. Le tarif est fixé chaque décembre par arrêté ministériel: €197.", s:"The law requires announcing your company's birth in the press. Yes, a NEWSPAPER. Paper. The tariff is fixed every December by ministerial decree: €197."},
      {t:"Votre startup paraîtra entre une vente aux enchères agricole et un avis de divorce. Très digne.", s:"Your startup will appear between a farm auction and a divorce notice. Very dignified."} ],
      cost:197, san:6, doc:'Attestation de parution' },
    { who:'Guichet Unique (INPI)', lines:[
      {t:"Le portail unique remplace sept anciens portails! Il fonctionne... parfois. Ah — il est en panne. Revenez plus tard.", s:"The single portal replaces seven old portals! It works... sometimes. Ah — it is down. Come back later."},
      {t:"Bonne nouvelle: l'État a légalisé une 'procédure de secours' officielle. Le guichet unique possède un guichet de secours. Réessayons... ça marche! Dossier transmis.", s:"Good news: the state has legalized an official 'backup procedure'. The one-stop shop has a backup shop. Let's retry... it works! File transmitted."} ],
      wait:4, san:8, doc:'Dossier Guichet Unique' },
    { who:'Greffe du tribunal',
      bounce:{ to:0,
        lines:[ {t:"Votre dossier... refusé. Une virgule manque à la page 34 de vos statuts. Retournez chez votre avocat.", s:"Your file... rejected. A comma is missing on page 34 of your statuts. Return to your avocat."} ],
        visitLines:[ {t:"Une VIRGULE?! ... La voilà. Soixante pages, à nouveau paraphées. Mes hommages au greffier.", s:"A COMMA?! ...There it is. Sixty pages, initialed anew. My compliments to the clerk."} ],
        doc:'Statuts (avec virgule)', san:8,
        nag:{t:"Sans la virgule, pas d'immatriculation. L'article 4 est formel.", s:"Without the comma, no registration. Article 4 is categorical."} },
      lines:[
      {t:"La virgule est conforme. Greffe: €37,45 — ce prix inclut une SECONDE publication officielle dont personne ne parle. Plus €21,41 pour le registre des bénéficiaires effectifs, qui répète vos statuts.", s:"The comma is compliant. Registry: €37.45 — the price includes a SECOND official publication nobody mentions. Plus €21.41 for the beneficial-owners register, which repeats your statuts."},
      {t:"Voici votre extrait Kbis. Le parchemin sacré. Banques, bailleurs, fournisseurs — tous exigeront le Kbis, toujours frais, jamais plus vieux que trois mois.", s:"Here is your Kbis extract. The sacred scroll. Banks, landlords, suppliers — all will demand the Kbis, always fresh, never older than three months."} ],
      cost:59, wait:5, doc:'Extrait Kbis ✨' } ] },

{ id:'de', name:'Germany', flag:'🇩🇪', entity:'UG / GmbH', estDays:90, roof:0, office:'Amtsgericht Charlottenburg — Handelsregister, Berlin', bs:'fachwerk', wc:'#f0e8d8', rc:['#8a4a3a','#6e3a2c'], src:[["GmbHG (5a UG, 11 liability)", "https://www.gesetze-im-internet.de/gmbhg/"], ["BeurkG 13 - the read-aloud law", "https://www.gesetze-im-internet.de/beurkg/__13.html"], ["Handelsregister fee schedule (HRegGebV)", "https://www.gesetze-im-internet.de/hreggebv/"]],
  tag:"The notary reads the deed aloud (§13 BeurkG). Until registration you are personally liable (§11 II GmbHG). The online tax portal mails its activation code on paper.",
  outro:"Roughly a quarter of a year. Between notarization and registration you were personally and unlimitedly liable — precisely during the window you had to act. Your data now lives in the Handelsregister, the Transparenzregister and the Gewerberegister; none of them talk to each other. Somewhere in Delaware, a founder incorporated, raised a seed round and pivoted twice while you waited for ELSTER's letter.",
  steps:[
    { who:'Berater Klaus', lines:[
      {t:"Willkommen! Bevor irgendetwas passiert, die große deutsche Frage: UG oder GmbH?", s:"Welcome! Before anything happens, the great German question: UG or GmbH?"} ],
      choice:{ prompt:{t:"Also: UG oder GmbH?", s:"So: UG or GmbH?"}, options:[
        { label:"UG (haftungsbeschränkt) — €1 Kapital", set:{de:'UG'},
          reply:{t:"Die Unternehmergesellschaft! Ein Euro genügt. Aber: Sie müssen für immer '(haftungsbeschränkt)' ausschreiben — Abkürzen ist gesetzlich verboten. Und 25% jedes Gewinns wandern in die Rücklage, bis €25.000 erreicht sind.", s:"The entrepreneurial company! One euro suffices. But you must forever write out '(haftungsbeschränkt)' in full — abbreviating is illegal. And 25% of every profit is locked away until you reach €25,000."} },
        { label:"GmbH — €25.000 Kapital, Respekt inklusive", set:{de:'GmbH'},
          reply:{t:"Solide. Deutsch. €12.500 müssen vor der Eintragung eingezahlt sein. Ihr Geld macht dann einen behördlich angeordneten Mittagsschlaf.", s:"Solid. German. €12,500 must be paid in before registration. Your money then takes a government-mandated nap."} } ] } },
    { who:'Notar Dr. von Siegel', lines:[
      {t:"Ein Termin? Gerne. Mein nächster freier Termin ist in drei Wochen.", s:"An appointment? Gladly. My next opening is in three weeks."},
      {t:"(Drei Wochen später.) Ich werde nun Ihre Satzung VORLESEN. Jedes Wort. §13 Beurkundungsgesetz. Bei der Online-Gründung per Video lese ich übrigens auch vor — dort kostet es €25 Aufschlag.", s:"(Three weeks later.) I will now read your articles ALOUD. Every word. §13 of the Notarization Act. In the online video formation I also read aloud, by the way — there it costs a €25 surcharge."},
      {t:"...Paragraph 14, Absatz 3, Satz 2... Sie sind noch wach? Beeindruckend.", s:"...paragraph 14, subsection 3, sentence 2... you are still awake? Impressive."} ],
      cost:(g)=>(g.vars.de==='UG'?165:800), wait:21, san:10, doc:'Notarielle Urkunde' },
    { who:'Herr Sparfuchs (Bank)',
      bounce:{ to:1,
        lines:[ {t:"Ein Geschäftskonto? Sehr gerne. Ich brauche nur Ihren Handelsregisterauszug.", s:"A business account? With pleasure. I just need your commercial-register excerpt."},
          {t:"Sie brauchen das Konto, UM eingetragen zu werden? Ah. Der Kreis. Holen Sie mir wenigstens eine beglaubigte Abschrift vom Notar. Ohne Papier kein Konto.", s:"You need the account IN ORDER to get registered? Ah. The circle. At least fetch me a certified copy from the notary. No paper, no account."} ],
        visitLines:[ {t:"Die Bank schickt Sie zurück? Natürlich tut sie das. Hier, eine beglaubigte Abschrift. Macht €15. Grüßen Sie Herrn Sparfuchs.", s:"The bank sent you back? Of course it did. Here, a certified copy. That's €15. Give my regards to Mr. Sparfuchs."} ],
        doc:'Beglaubigte Abschrift', san:8,
        nag:{t:"Ohne die Abschrift vom Notar kann ich gar nichts machen. Ich bin sehr gut im Nichtstun — aber nur mit Papier.", s:"Without the notary's copy I can do nothing at all. I am very good at doing nothing — but only with the paperwork."} },
      lines:[
      {t:"Ah, die Abschrift! Compliance wird Sie jetzt 'prüfen'. Compliance hat Zeit. Compliance IST Zeit.", s:"Ah, the copy! Compliance will now 'take a look at you'. Compliance has time. Compliance IS time."},
      {t:"Kleines Detail: Bis zur Eintragung haften Sie persönlich und unbeschränkt. Genau in dem Zeitraum, in dem Sie handeln müssen. §11 Absatz 2 GmbHG. Viel Vergnügen.", s:"Small detail: until registration you are personally and unlimitedly liable. Precisely during the window in which you must act. §11(2) GmbHG. Enjoy."} ],
      capital:(g)=>(g.vars.de==='UG'?1:12500), wait:14, san:8, doc:'Einzahlungsbeleg' },
    { who:'Handelsregister', lines:[
      {t:"Ihr Notar reicht die Anmeldung elektronisch ein. Das Gericht druckt sie aus.", s:"Your notary files electronically. The court prints it out."},
      {t:"HRB-Nummer erteilt! Sie existieren jetzt, juristisch gesehen. Existenzgebühr: €150.", s:"HRB number granted! You now exist, legally speaking. Existence fee: €150."} ],
      cost:150, wait:15, doc:'Handelsregisterauszug' },
    { who:'Gewerbeamt', lines:[
      {t:"Gewerbeanmeldung, Formular GewA1, €31. Wir informieren automatisch das Finanzamt, die IHK und die Berufsgenossenschaft. ...Oder? Melden Sie sich sicherheitshalber überall selbst.", s:"Trade registration, form GewA1, €31. We automatically notify the tax office, the chamber and the accident-insurance fund. ...Do we? To be safe, notify all of them yourself anyway."},
      {t:"Übrigens: Die Berufsgenossenschaft will Sie binnen 7 Tagen. Auch mit null Mitarbeitern.", s:"By the way: the statutory accident-insurance fund wants you registered within 7 days. Even with zero employees."} ],
      cost:31, wait:3, doc:'Gewerbeschein' },
    { who:'Frau Steuerwald (Finanzamt)', lines:[
      {t:"Der Fragebogen zur steuerlichen Erfassung: acht Seiten. Schätzen Sie bitte Ihre Gewinne für zwei Jahre. Falsche Schätzungen werden später bestraft.", s:"The tax-registration questionnaire: eight pages. Kindly estimate your profits for two years. Wrong estimates are penalized later."},
      {t:"Einreichung nur über ELSTER, unser Online-Portal! Der Aktivierungscode kommt per Post. Innerhalb von zwei Wochen. Digitales Deutschland!", s:"Filing only via ELSTER, our online portal! The activation code arrives by physical mail. Within two weeks. Digital Germany!"},
      {t:"Ihre Steuernummer kommt, wenn sie kommt. Ohne sie: keine ordentlichen Rechnungen. Das war schon immer so.", s:"Your tax number comes when it comes. Without it: no proper invoices. It has always been thus."} ],
      wait:30, san:15, doc:'Steuernummer' },
    { who:'IHK', lines:[
      {t:"Herzlichen Glückwunsch! Sie sind jetzt PFLICHTMITGLIED der Industrie- und Handelskammer!", s:"Congratulations! You are now a MANDATORY member of the Chamber of Industry and Commerce!"},
      {t:"Sie haben nicht gefragt, Mitglied zu werden. Das macht es ja so besonders. Hier ist die Rechnung.", s:"You did not ask to join. That is what makes it so special. Here is the invoice."} ],
      cost:250, san:8, doc:'IHK-Mitgliedschaft' },
    { who:'Transparenzregister', lines:[
      {t:"Zum Schluss: Melden Sie dem Transparenzregister, dass Sie Ihre eigene Firma besitzen. Kostet €19,80 im Jahr und enthält, was das Handelsregister schon weiß.", s:"Finally: report to the Transparency Register that you own your own company. Costs €19.80 a year and contains what the commercial register already knows."},
      {t:"Und der Rundfunkbeitrag: €6,12 im Monat pro Betriebsstätte. Auch ohne Radio. Fragen Sie nicht. — Sie sind hiermit... eingetragen. Willkommen in Deutschland!", s:"And the broadcast fee: €6.12 a month per office. Even without a radio. Don't ask. — You are hereby... registered. Welcome to Germany!"} ],
      cost:20, wait:2, doc:'Transparenzregister-Eintrag' } ] },

{ id:'gr', name:'Greece', flag:'🇬🇷', entity:'IKE', estDays:14, roof:4, office:'Γενικό Εμπορικό Μητρώο (Γ.Ε.ΜΗ.), Αθήνα', bs:'white', wc:'#f6f3ec', rc:['#3f6fb5','#2d5390'], src:[["e-YMS one-stop portal (18 euro)", "https://eyms.businessportal.gr/cost"], ["e-EFKA contributions", "https://www.e-efka.gov.gr"]],
  tag:"An €18 company in one hour, online, no notary — genuinely real. Then €245/month social insurance from day one and €100/year for the registry to remember you exist.",
  steps:[
    { who:'ΔΟΥ (Εφορία)', queue:'ΕΞΥΠΗΡΕΤΕΙΤΑΙ ΤΩΡΑ', lines:[
      {t:"Πρώτα ΑΦΜ για κάθε ιδρυτή. Εξυπηρετείται τώρα το νούμερο 12. Εσείς είστε το 847.", s:"First, an AFM tax number for every founder. Now serving number 12. You are number 847."},
      {t:"Η μηχανή σφραγίδων δεν έχει μελάνι. Ο άνθρωπος με το μελάνι έρχεται την Πέμπτη.", s:"The stamp machine is out of ink. The ink man comes on Thursday."} ],
      wait:7, san:10, doc:'ΑΦΜ' },
    { who:'e-ΥΜΣ (πύλη)', lines:[
      {t:"Η ΙΚΕ ηλεκτρονικά: €18, μία ώρα, χωρίς συμβολαιογράφο! Με ΕΝΑΝ όρο: το καταστατικό-υπόδειγμα. Ούτε μία λέξη αλλαγμένη.", s:"The IKE online: €18, one hour, no notary! On ONE condition: the model articles. Not a single word changed."} ],
      choice:{ prompt:{t:"Υπόδειγμα ή ελευθερία;", s:"The template, or freedom?"}, options:[
        { label:"Το υπόδειγμα — €18 (καμία αλλαγή)",
          reply:{t:"Σοφή επιλογή. Καταχωρήθηκε! Μία ώρα, δεκαοκτώ ευρώ. Η Ελλάδα εξέπληξε και τους δύο μας.", s:"A wise choice. Registered! One hour, eighteen euros. Greece has surprised us both."} },
        { label:"Δικό μου καταστατικό — συμβολαιογράφος, €1.500, +7 μέρες", fn:(g)=>{ pay(1500,false); g.pendingWait=(g.pendingWait||0)+7; },
          reply:{t:"Αλλάξατε μία λέξη; Συμβολαιογράφος. Τριάντα φορές η τιμή.", s:"You changed one word? Notary. Thirty times the price."} } ] },
      cost:18, doc:'Καταστατικό ΙΚΕ' },
    { who:'ΕΦΚΑ', lines:[
      {t:"Ο διαχειριστής ασφαλίζεται υποχρεωτικά: €245 τον μήνα. Από την πρώτη ημέρα. Ακόμα κι αν η εταιρεία κοιμάται κι εσείς δεν πληρώνεστε.", s:"The manager is compulsorily insured: €245 a month. From day one. Even if the company is dormant and you are unpaid."} ],
      cost:245, san:8, wait:2, doc:'Εγγραφή ΕΦΚΑ' },
    { who:'ΓΕΜΗ', lines:[
      {t:"Πιστοποιήστε την καταβολή του κεφαλαίου εντός ενός μηνός. Και μην ξεχνάτε: €100 τον χρόνο για να διατηρεί το ΓΕΜΗ τον φάκελό σας.", s:"Certify the capital payment within one month. And don't forget: €100 a year for GEMI to maintain your file."} ],
      cost:100, wait:3, doc:'Βεβαίωση ΓΕΜΗ' } ] },

{ id:'hu', name:'Hungary', flag:'🇭🇺', entity:'Kft.', estDays:8, roof:5, office:'Fővárosi Törvényszék Cégbírósága, Budapest', bs:'plaster', wc:'#e8d9a8', rc:['#b0563c','#8a3f2a'], src:[["e-cegjegyzek (company register)", "https://www.e-cegjegyzek.hu"], ["Registration fees abolished (2017)", "https://www.schoenherr.eu/content/hungary-registration-fees-for-company-establishment-abolished/"]],
  tag:"State duty: zero forints. Filing without a lawyer: illegal. The 'free' procedure therefore costs €800. Genuinely fast anyway — and a late questionnaire reply can delete your tax number.",
  steps:[
    { who:'Dr. Kovács ügyvéd', lines:[
      {t:"Magyarországon cégalapítási iratokat kizárólag ügyvéd ellenjegyezhet. A saját papírmunkája — törvénytelen. Az állami illeték: nulla forint. Az én díjam: €800.", s:"In Hungary, incorporation documents may only be countersigned by a lawyer. Doing your own paperwork — illegal. The state duty: zero forints. My fee: €800."},
      {t:"Az 'ingyenes' eljárás, amelyet tilos ingyen elvégeznie.", s:"The 'free' procedure that you are forbidden to perform for free."} ],
      cost:800, wait:2, san:5, doc:'Ellenjegyzett alapító okirat' },
    { who:'Cégbíróság', lines:[
      {t:"Egyszerűsített eljárás, elektronikus benyújtás — az ügyvédjén keresztül, természetesen. A törvény szerint egy munkanapon belül döntünk. És tényleg döntünk.", s:"Simplified procedure, electronic filing — through your lawyer, naturally. By law we must decide within one business day. And we actually do."},
      {t:"A hárommillió forint törzstőkét befizetheti a cég saját házipénztárába. A házipénztár: egy fiók. Holnap már költheti is.", s:"You may pay the three-million-forint capital into the company's own cash desk. The cash desk: a drawer. You can spend it tomorrow."} ],
      cost:100, capital:7700, wait:2, doc:'Cégkivonat' },
    { who:'NAV', lines:[
      {t:"Az adószáma a cégével együtt született, automatikusan. De vigyázat: jöhet a KOCKERD kockázati kérdőív.", s:"Your tax number was born together with your company, automatically. But beware: the KOCKERD risk questionnaire may arrive."},
      {t:"Ha tíz napon belül nem válaszol, az adószámát TÖRÖLJÜK. Válaszoljon időben.", s:"Fail to answer within ten days and your tax number is DELETED. Reply on time."} ],
      wait:1, san:6, doc:'Adószám' },
    { who:'Bank + Kamara', lines:[
      {t:"Bankszámla: nyolc napon belül kötelező, kizárólag személyesen. A bank egyúttal az állam adatgyűjtője is a tényleges tulajdonosokról.", s:"A bank account: mandatory within eight days, strictly in person. The bank doubles as the state's data collector on beneficial owners."},
      {t:"És a kamarai REGISZTRÁCIÓ kötelező — évi 5000 forint. A kamarai TAGSÁG önkéntes. Regisztrálnia és fizetnie kell; tagnak lennie nem. Viszlát!", s:"And chamber REGISTRATION is mandatory — HUF 5,000 a year. Chamber MEMBERSHIP is voluntary. You must register and pay; being a member, no. Goodbye!"} ],
      cost:13, wait:2, doc:'Bankszámla + regisztráció' } ] },

{ id:'ie', name:'Ireland', flag:'🇮🇪', entity:'LTD', estDays:8, roof:2, office:'Companies Registration Office (CRO), Dublin', bs:'pub', wc:'#3f7a48', rc:['#3a3a40','#2a2a30'], src:[["CRO - incorporation", "https://www.cro.ie"], ["Revenue - VAT registration", "https://www.revenue.ie"]],
  tag:"€50 to incorporate. A one-person company needs two officers — the sole director must recruit a second human to be secretary. No EEA director? Buy a €25,000 bond insuring the state against your own future fines.",
  steps:[
    { who:'CRO Desk', lines:[
      "Form A1, constitution attached, €50. Grand.",
      "One thing: at least one director must live in the EEA. No EEA director? Then a Section 137 bond — €25,000 of cover, premium about €1,957.50.",
      "It insures the company against its own future fines." ],
      cost:50, wait:3, doc:'Form A1' },
    { who:'The Second Human Desk', lines:[
      "A single-director company still needs a company secretary — and the sole director cannot be it. You must recruit a second human, purely to hold the title.",
      "Any human will do. A neighbour. A cousin. Or a company that rents out humans: €300 a year." ],
      cost:300, san:4, doc:'Company Secretary' },
    { who:'Certificate Desk', lines:[
      "Fé Phráinn scheme: incorporated in about five working days. Here's your certificate.",
      "Corporation tax is 12.5% — you may have heard. Everyone's heard. Half the internet is headquartered up the road because they heard." ],
      wait:4, doc:'Certificate of Incorporation' },
    { who:'RBO Desk', lines:[
      "File your beneficial owners within five months. It's free.",
      "Missing it: a fine up to €500,000 on indictment." ],
      wait:1, doc:'RBO Filing' } ] },

{ id:'it', name:'Italy', flag:'🇮🇹', entity:'S.r.l.', estDays:25, roof:3, office:'Registro delle Imprese — Camera di Commercio, Roma', bs:'medit', wc:'#e8c89a', rc:['#c0563a','#96422c'], src:[["Registro delle Imprese", "https://www.registroimprese.it"], ["The 309.87 euro book-stamping tax", "https://fiscomania.com/tassa-annuale-vidimazione-libri-sociali/"]],
  tag:"A €309.87/year tax for stamping the corporate books — that's 600,000 lire converted to the cent. The lira died in 2002; the tax is immortal. The espresso, to be fair, is excellent.",
  steps:[
    { who:'Agenzia delle Entrate', lines:[
      {t:"Prima di tutto: il codice fiscale. Per OGNI socio e per OGNI amministratore. Senza codice fiscale, in Italia, lei formalmente non esiste.", s:"First of all: the codice fiscale. For EVERY shareholder and EVERY director. Without one, in Italy, you formally do not exist."} ],
      wait:6, san:5, doc:'Codice fiscale' },
    { who:'Gestore PEC', lines:[
      {t:"La sua società deve avere per legge una PEC — un'email certificata, solenne, italiana. L'email normale è per le persone normali.", s:"Your company must by law have a PEC — a certified, solemn, Italian email. Regular email is for regular people."},
      {t:"E da poco anche OGNI amministratore deve avere la propria PEC personale. La scadenza era il 30 giugno. Poi il ministero ha ammesso che quella scadenza legalmente non esisteva. Poi un decreto l'ha ricreata. Benvenuto in Italia.", s:"And recently EVERY director must also have a personal PEC. The deadline was June 30th. Then the ministry admitted the deadline didn't legally exist. Then a decree re-created it. Welcome to Italy."} ],
      cost:65, doc:'PEC (×2)' },
    { who:'Notaio Dott. Bellini', lines:[
      {t:"Prego! L'atto costitutivo davanti al notaio. Il mio onorario: €2.000. L'espresso è incluso, ed è eccellente.", s:"Please! The deed of incorporation before the notary. My fee: €2,000. The espresso is included, and it is excellent."},
      {t:"Leggeremo l'atto ad alta voce. Con sentimento. Con gesti. Poi: imposta di registro €200, bolli €156.", s:"We shall read the deed aloud. With feeling. With gestures. Then: €200 registration tax, €156 in stamp duties."} ],
      cost:2356, wait:8, san:6, doc:'Atto costitutivo' },
    { who:'ComUnica / Registro Imprese', lines:[
      {t:"Una pratica unica: registro imprese, partita IVA, INPS, INAIL. Le stesse domande, quattro volte.", s:"One single filing: business register, VAT number, social security, accident insurance. The same questions, four times."},
      {t:"Risponda con sicurezza.", s:"Answer with confidence."} ],
      cost:90, wait:5, doc:'Partita IVA' },
    { who:'Camera di Commercio', lines:[
      {t:"Diritto camerale: €120 all'anno, anche a fatturato zero. E la tassa di vidimazione dei libri sociali: €309,87. OGNI anno. Per sempre.", s:"Chamber fee: €120 a year, even at zero revenue. And the corporate-books stamping tax: €309.87. EVERY year. Forever."},
      {t:"Perché €309,87? Sono 600.000 lire, convertite al centesimo. La lira è morta nel 2002.", s:"Why €309.87? It is 600,000 lire, converted to the cent. The lira died in 2002."} ],
      cost:430, wait:3, san:5, doc:'Iscrizione camerale' } ] },

{ id:'lv', name:'Latvia', flag:'🇱🇻', entity:'SIA', estDays:7, roof:6, office:'Uzņēmumu reģistrs, Rīga', bs:'nordic', wc:'#a08858', rc:['#4a4a52','#38383e'], src:[["Uznemumu registrs - SIA", "https://www.ur.gov.lv"], ["VID e-services", "https://www.vid.gov.lv"]],
  tag:"€1 capital, €20 state fee. One €1-company per person. Under €50,000, proof of payment is a form you sign yourself.",
  steps:[
    { who:'eParaksts galds', lines:[
      {t:"Reģistrācija tiešsaistē 'piecās minūtēs'! Vajag tikai eParakstu. eParakstam vajag Latvijas personas kodu. Ārzemniekam tāda nav.", s:"Online registration 'in five minutes'! You just need eParaksts. eParaksts needs a Latvian personal code. A foreigner doesn't have one."},
      {t:"...Nokārtots. Un tas nostrādāja pirmajā reizē. Mēs arī esam pārsteigti. Nestāstiet nevienam — cels gaidas.", s:"...Sorted. And it worked on the first try. We're surprised too. Don't tell anyone — expectations will rise."} ],
      wait:3, san:5, doc:'eParaksts' },
    { who:'Īpašnieka piekrišana', lines:[
      {t:"Juridiskajai adresei vajadzīga īpašnieka rakstiska piekrišana. Vēstule, paraksts, viss kārtībā. Bez vēstules nav adreses; bez adreses nav firmas.", s:"The legal address requires the property owner's written consent. A letter, a signature, all in order. No letter, no address; no address, no company."} ],
      cost:10, doc:'Īpašnieka piekrišana' },
    { who:'Uzņēmumu reģistrs', lines:[
      {t:"Mazkapitāla SIA: kapitāls €1, valsts nodeva €20. Un atcerieties: tikai VIENA €1 sabiedrība uz cilvēku.", s:"Small-capital SIA: capital €1, state fee €20. And remember: only ONE €1 company per person."},
      {t:"Kapitāla pierādījums? Zem €50.000 pietiek ar jūsu parakstu uz veidlapas KR4, ka samaksājāt. Mēs jums uzticamies. Oficiāli.", s:"Proof of capital? Under €50,000, your signature on form KR4 stating you paid suffices. We trust you. Officially."} ],
      cost:20, capital:1, wait:4, doc:'Reģistrācijas apliecība' } ] },

{ id:'lt', name:'Lithuania', flag:'🇱🇹', entity:'UAB', estDays:10, roof:7, office:'VĮ Registrų centras, Vilnius', bs:'nordic', wc:'#c8a858', rc:['#4a4a52','#38383e'], src:[["Registru centras", "https://www.registrucentras.lt"], ["VLKK - the language commission", "https://vlkk.lt"]],
  tag:"Your company name must be approved by the State Commission of the Lithuanian Language. Foreign words: rejected. Then the bank wants a registered company and the register wants a bank deposit.",
  steps:[
    { who:'Kalbos komisija (VLKK)', lines:(g)=>[
      {t:"Jūsų įmonės pavadinimas turi atitikti lietuvių kalbos normas. Taip — pavadinimą vertina Valstybinė lietuvių kalbos komisija. Užsienietiški žodžiai atmetami.", s:"Your company name must comply with Lithuanian language norms. Yes — the name is assessed by the State Commission of the Lithuanian Language. Foreign words are rejected."},
      {t:"„"+g.coName+"“? Ne. Visiškai ne. Gal „Jolas“? Rezervacija: €16,22.", s:"'"+g.coName+"'? No. Absolutely not. Perhaps 'Jolas'? Reservation: €16.22."} ],
      cost:16, wait:2, san:6, doc:'Pavadinimo rezervacija' },
    { who:'Bankas', lines:[
      {t:"Kaupiamoji sąskaita — įmonei, kurios dar nėra. Bankas nori registruotos įmonės, registras nori banko indėlio.", s:"An accumulative account — for a company that doesn't exist yet. The bank wants a registered company; the register wants a bank deposit."} ],
      capital:1000, wait:3, doc:'Kaupiamosios sąskaitos pažyma' },
    { who:'Registrų centras', lines:[
      {t:"Internetu registruoti galima — bet tik su pavyzdiniais įstatais, lietuvių kalba, ir su kvalifikuotu e. parašu, kurio užsieniečiai paprastai negauna.", s:"You can register online — but only with model articles, in Lithuanian, and with a qualified e-signature foreigners generally can't get."},
      {t:"Smart-ID? Atrodo kaip parašas, veikia kaip parašas, bet teisiškai — ne parašas. Registruota! €30,83.", s:"Smart-ID? Looks like a signature, works like a signature, legally — not a signature. Registered! €30.83."} ],
      cost:31, wait:3, doc:'UAB registracija' },
    { who:'JADIS / JANGIS', lines:[
      {t:"Dar dvi santrumpos: akcininkai — į JADIS, naudos gavėjai — į JANGIS, per 10 darbo dienų. Bankas nebaigs jūsų pažinimo be jų. Sėkmės!", s:"Two more acronyms: shareholders into JADIS, beneficial owners into JANGIS, within 10 working days. The bank won't finish 'knowing you' without them. Good luck!"} ],
      wait:2, doc:'JADIS + JANGIS' } ] },

{ id:'lu', name:'Luxembourg', flag:'🇱🇺', entity:'SARL', estDays:35, roof:0, office:'Registre de Commerce et des Sociétés (RCS), Luxembourg', bs:'mansard', wc:'#e8e0d0', rc:['#5a6478','#454e60'], src:[["Guichet.lu - SARL", "https://guichet.public.lu/en/entreprises/creation-developpement/forme-juridique/societe-capitaux/sarl.html"], ["Business permit (autorisation)", "https://guichet.public.lu"]],
  tag:"The permit needs a manager already running the company; the bank needs the permit; the notary needs the bank; the registry needs the notary. Meanwhile your €12,000 sits frozen, waiting for everyone.",
  steps:[
    { who:"Ministère de l'Économie", lines:[
      {t:"D'abord: l'autorisation d'établissement. Nous vérifions que votre dirigeant gère l'entreprise réellement et en permanence, depuis le Luxembourg. S'il habite trop loin — refusé.", s:"First: the business permit. We verify that your manager actually and permanently runs the business, from Luxembourg. If he lives too far away — refused."},
      {t:"Délai légal: trois mois. Si nous ne répondons jamais, c'est tacitement approuvé.", s:"Legal deadline: three months. If we never answer, you are tacitly approved."} ],
      cost:50, wait:14, san:8, doc:"Autorisation d'établissement" },
    { who:'Agent de domiciliation', lines:[
      {t:"Une adresse? Seule une caste agréée par l'État — banques, avocats, experts-comptables — a le droit de domicilier des sociétés. €400 par mois,.", s:"An address? Only a state-approved caste — banks, lawyers, accountants — may host companies. €400 a month,."} ],
      cost:400, doc:'Contrat de domiciliation' },
    { who:'Banque Privée', lines:[
      {t:"Nous bloquons vos €12.000. Pour ouvrir ce compte, il nous faut l'autorisation ET le projet d'acte du notaire. Le notaire, lui, exige notre certificat de blocage.", s:"We block your €12,000. To open this account we need the permit AND the notary's draft deed. The notary, meanwhile, demands our blocking certificate."},
      {t:"Tout le monde attend tout le monde. Vos €12.000 attendent aussi.", s:"Everyone waits for everyone. Your €12,000 waits too."} ],
      capital:12000, wait:8, san:8, doc:'Certificat de blocage' },
    { who:'Notaire Weber', lines:[
      {t:"L'acte, en français ou en allemand. Mes honoraires: €1.500. Le Luxembourg est petit; les factures sont denses.", s:"The deed, in French or German. My fee: €1,500. Luxembourg is small; the invoices are dense."} ],
      cost:1500, wait:6, doc:'Acte notarié' },
    { who:'RCS + Chambre de Commerce', lines:[
      {t:"Immatriculation RCS: €100. Registre des bénéficiaires effectifs: €15. Et l'adhésion à la Chambre de Commerce: automatique, obligatoire, cotisation annuelle.", s:"RCS registration: €100. Beneficial-owners register: €15. And Chamber of Commerce membership: automatic, mandatory, annual dues."},
      {t:"Les consultants appellent la cotisation 'un impôt caché en espèces'. Nous l'appelons tradition. Wëllkomm!", s:"Consultants call the dues 'a hidden cash tax'. We call it tradition. Welcome!"} ],
      cost:185, wait:4, doc:'Extrait RCS' } ] },

{ id:'mt', name:'Malta', flag:'🇲🇹', entity:'LTD', estDays:50, roof:1, office:'Malta Business Registry, Żejtun', bs:'stone', wc:'#e0cf9e', rc:['#c8b878','#a89858'], src:[["MBR registration & fee structure", "https://mbr.mt/registration-and-fee-structure/"], ["Audit exemption via LN 139/2025", "https://kpmg.com/mt/en/home/insights/2025/08/malta-audit-exemption-rules.html"]],
  tag:"The company takes days; the bank account takes 3–12 months, or never. Registration fees scale with the capital you merely DECLARED. Audit exemption depends on your shareholders' school certificates.",
  outro:"The company took under a week. The bank account took the rest of your youth. Corporate tax is 35% — the EU's highest — but shareholders reclaim six-sevenths after dividends, paid to the bank account you may never get. Malta is an island-sized metaphor.",
  steps:[
    { who:'CSP Desk', lines:[
      "Welcome! Everything here happens in English — Malta's genuine competitive advantage over Cyprus.",
      "Your corporate service provider package: €1,200. Not legally mandatory. Practically inevitable." ],
      cost:1200, doc:'CSP Engagement' },
    { who:'Bank (Formation Desk)', lines:[
      "We happily block €232.94 — twenty percent of the minimum capital of €1,164.69, an unrounded conversion of 500 old Maltese liri.",
      "Whether the born company may later have an ACTUAL account is a separate and much longer question." ],
      capital:233, wait:3, doc:'Deposit Evidence' },
    { who:'Malta Business Registry', lines:[
      "Registration fee: scales with the AUTHORISED capital you merely declared. So does the annual-return fee, every year, in the annual-return fee.",
      "Also: every company needs an annual audit. Unless your shareholders hold school certificates at MQF level 3 — the audit waiver runs on your diplomas. Legal Notice 139 of 2025." ],
      cost:245, wait:4, san:4, doc:'Certificate of Registration' },
    { who:'The Bank Account', lines:[
      "Now, the operating account. Compliance review. Source of funds. Source of wealth. Source of the source. References for the references.",
      "Best case: 4–8 weeks. Realistic: 3 to 12 months. Possible: no.",
      "Most founders give up and use a foreign fintech. Some government payments still want a real Maltese account. Would you like a coffee? You will want a subscription." ],
      wait:40, san:18, doc:'Bank Account (eventually)' } ] },

{ id:'nl', name:'Netherlands', flag:'🇳🇱', entity:'BV', estDays:14, roof:2, office:'Kamer van Koophandel (KVK), Utrecht', bs:'brick', wc:'#8a4a34', rc:['#3a3a40','#2a2a30'], src:[["KVK registration fee (82.25 euro)", "https://www.kvk.nl/inschrijven/inschrijfvergoeding/"], ["DGA customary-salary rule", "https://www.belastingdienst.nl"]],
  tag:"Minimum capital: one cent. Certifying it requires a mandatory notary at €1,500. The UBO register is mandatory to fill in and, since 2022, forbidden to read. KVK fee: €82.25.",
  steps:[
    { who:'Notaris de Vries', lines:[
      {t:"Een BV oprichten kan vanaf €0,01 kapitaal. Maar uitsluitend via een notaris. U betaalt dus €1.500 aan een professional om één cent te certificeren.", s:"You can found a BV with €0.01 of capital. But only through a notary. So you pay €1,500 to a professional to certify one cent."},
      {t:"Eerst mijn witwasonderzoek volgens de Wwft. Daarna herhaalt de bank exact hetzelfde onderzoek.", s:"First my anti-money-laundering check under the Wwft. Then the bank repeats exactly the same check."} ],
      cost:1500, wait:5, san:5, doc:'Akte van oprichting' },
    { who:'KVK-balie', lines:[
      {t:"Inschrijving: €82,25. Niet €82. Niet €83. €82,25.", s:"Registration: €82.25. Not €82. Not €83. €82.25."} ],
      cost:82, wait:2, doc:'KVK-nummer' },
    { who:'Belastingdienst', lines:[
      {t:"Uw btw-nummer vraagt u niet aan. Het komt vanzelf. Per brief. Over een week of twee.", s:"You do not apply for your VAT number. It simply arrives. By letter. In a week or two."},
      {t:"Of het komt stilletjes niet — dat merkt u dan vanzelf, op het slechtst mogelijke moment.", s:"Or it silently doesn't arrive — which you will discover naturally, at the worst possible moment."} ],
      wait:6, doc:'Btw-identificatienummer' },
    { who:'UBO-register + DGA', lines:[
      {t:"Het UBO-register: verplicht invullen, op straffe van €21.750 boete. Maar sinds het EU-Hof mag bijna niemand het meer inzien.", s:"The UBO register: mandatory to fill in, on pain of a €21,750 fine. But since the EU Court ruling, almost nobody may view it."},
      {t:"O ja: als directeur-grootaandeelhouder moet u zichzelf een 'gebruikelijk loon' betalen. Minimaal €56.000 per jaar. Ook zonder omzet. Veel succes ermee.", s:"Oh yes: as founder-director you must pay yourself a 'customary salary'. Minimum €56,000 a year. Even with zero revenue. Best of luck with that."} ],
      wait:2, san:6, doc:'UBO-registratie' } ] },

{ id:'pl', name:'Poland', flag:'🇵🇱', entity:'Sp. z o.o.', estDays:12, roof:3, office:'Krajowy Rejestr Sądowy (KRS), Warszawa', bs:'plaster', wc:'#e8dcc8', rc:['#8a5a48','#6e4638'], src:[["S24 / biznes.gov.pl", "https://www.biznes.gov.pl"], ["CRBR (UBO register, PLN 1M fine)", "https://www.gov.pl/web/finanse/crbr"]],
  tag:"The 24-hour online portal is exclusively in Polish, and its free signing path needs a PESEL — the 'fully remote' route begins with living in Poland. Then a 23-złoty tax nobody tells you about.",
  steps:[
    { who:'Profil Zaufany', lines:[
      {t:"Rejestracja online w 24 godziny! Potrzebny tylko Profil Zaufany. Do Profilu Zaufanego — numer PESEL. Do PESEL-u — zameldowanie w Polsce.", s:"Online registration in 24 hours! You just need a Trusted Profile. For a Trusted Profile — a PESEL number. For a PESEL — registered residence in Poland."},
      {t:"'W pełni zdalna' ścieżka zaczyna się więc od zamieszkania w Polsce.", s:"So the 'fully remote' route begins with living in Poland."} ],
      wait:5, san:6, doc:'Profil Zaufany' },
    { who:'Portal S24', lines:[
      {t:"Portal S24 jest wyłącznie po polsku. Komunikaty o błędach — po polsku. Przycisk, który naprawia błąd — również po polsku.", s:"The S24 portal is exclusively in Polish. The error messages — in Polish. The button that fixes the error — also in Polish."},
      {t:"Kliknęło się. Pojawił się PDF. To prawdopodobnie dobrze. Opłata sądowa: 250 złotych.", s:"Something got clicked. A PDF appeared. This is probably good. Court fee: PLN 250."} ],
      cost:59, wait:2, san:6, doc:'Wniosek S24' },
    { who:'Sąd (KRS)', lines:[
      {t:"Sąd rejestruje spółkę. NIP i REGON nadawane automatycznie. A kapitał — 5000 zł — można wpłacić do 7 dni PO rejestracji.", s:"The court registers the company. Tax numbers arrive automatically. And the capital — PLN 5,000 — may be paid up to 7 days AFTER registration."} ],
      capital:1175, wait:3, doc:'Wpis do KRS' },
    { who:'Urząd Skarbowy', lines:[
      {t:"Drobiazg, o którym nikt panu nie powie: podatek PCC — 0,5% kapitału, czyli 23 złote. Musi go pan SAM zadeklarować i zapłacić w 14 dni. Formularz PCC-3.", s:"A detail nobody will tell you about: the PCC tax — 0.5% of capital, i.e. 23 złoty. You must SELF-declare and pay it within 14 days. Form PCC-3."},
      {t:"Niezapłacenie 23 złotych to wykroczenie skarbowe. A beneficjentów zgłasza się do CRBR w 14 dni — kara sięga MILIONA złotych. Miłego dnia.", s:"Failing to pay the 23 złoty is a fiscal offence. And beneficial owners go into the CRBR within 14 days — the fine reaches a MILLION złoty. Have a nice day."} ],
      cost:6, wait:2, san:6, doc:'PCC-3 + CRBR' } ] },

{ id:'pt', name:'Portugal', flag:'🇵🇹', entity:'Lda.', estDays:2, roof:4, office:'Empresa na Hora — Registo Comercial, Lisboa', bs:'azulejo', wc:'#f2efe6', rc:['#c0563a','#96422c'], src:[["Empresa na Hora - official", "https://justica.gov.pt/Servicos/Empresa-na-Hora"], ["Name certificate (IRN)", "https://irn.justica.gov.pt"]],
  tag:"'Empresa na Hora' — a company in one hour, genuinely. You just pick the name from a government list of pre-generated fantasy words. Your own name: €75 and ten days. Also: an accountant, monthly, for life.",
  outro:"Under one hour at the counter — the fastest thing Portuguese bureaucracy has ever done. The price: your company answers to a name drawn from a government word-lottery, and a certified accountant bills you monthly until the heat death of the universe. Portugal contains multitudes.",
  steps:[
    { who:'Finanças', lines:[
      {t:"Primeiro: o NIF, número de contribuinte, para cada sócio. É gratuito... salvo se for de fora da UE.", s:"First: the NIF tax number, for every founder. It's free... unless you're from outside the EU."},
      {t:"Nesse caso precisa de um representante fiscal — um português profissional para receber o seu correio. Para sempre. Ele cobra por isso.", s:"In that case you need a fiscal representative — a professional Portuguese person to receive your mail. Forever. He charges for this."} ],
      cost:150, wait:3, doc:'NIF' },
    { who:'Empresa na Hora', lines:[
      {t:"Bem-vindo à 'Empresa na Hora'! Uma empresa em menos de uma hora. Literalmente. Com uma condição:", s:"Welcome to 'Company in an Hour'! A company in under an hour. Literally. With one condition:"},
      {t:"O nome vem da nossa bolsa de firmas — palavras de fantasia pré-geradas e pré-aprovadas. O SEU nome? Certificado de admissibilidade: €75, até dez dias.", s:"The name comes from our name pool — pre-generated, pre-approved fantasy words. YOUR name? A certificate of admissibility: €75, up to ten days."} ],
      choice:{ prompt:{t:"Escolha o nome legal da sua empresa:", s:"Choose your company's legal name:"}, options:[
        { label:"'Azulverde Digital, Lda.'", fn:(g)=>{ g.renamed = g.coName; g.coName = 'Azulverde Digital, Lda.'; },
          reply:{t:"Excelente escolha! 'Azulverde Digital' — cromática, moderna, pré-aprovada.", s:"Excellent choice! 'Azulverde Digital' — chromatic, modern, pre-approved."} },
        { label:"'Cometa Canela, Lda.'", fn:(g)=>{ g.renamed = g.coName; g.coName = 'Cometa Canela, Lda.'; },
          reply:{t:"'Cometa Canela' — picante, celestial e, sobretudo: pré-aprovada.", s:"'Cometa Canela' — spicy, celestial and, above all: pre-approved."} },
        { label:"O MEU nome (+€75, +10 dias)", fn:(g)=>{ pay(75,false); g.pendingWait=(g.pendingWait||0)+10; },
          reply:{t:"Como queira. A comissão do registo vai agora contemplar o seu nome. A comissão contempla ao seu próprio ritmo.", s:"As you wish. The registry committee will now contemplate your name. The committee contemplates at its own pace."} } ] } },
    { who:'Balcão único', lines:[
      {t:"Escritura, NIPC, registo comercial, segurança social — tudo neste balcão. €360. Quarenta e cinco minutos.", s:"Deed, tax number, commercial registration, social security — all at this counter. €360. Forty-five minutes."},
      {t:"A coisa mais rápida que a burocracia portuguesa alguma vez fez. Estamos tão surpreendidos como o senhor. Todas as vezes.", s:"The fastest thing Portuguese bureaucracy has ever done. We are as surprised as you are. Every single time."} ],
      cost:360, doc:'Certidão Permanente' },
    { who:'Contabilista Certificado', lines:[
      {t:"A declaração de início de atividade só é aceite se for assinada por um Contabilista Certificado. A sua empresa de €1 precisa de um contabilista pago. Todos os meses. Para toda a vida.", s:"The start-of-activity declaration is only accepted if signed by a Certified Accountant. Your €1 company needs a paid accountant. Every month. For life."} ],
      cost:150, wait:1, san:5, doc:'Início de atividade' } ] },

{ id:'ro', name:'Romania', flag:'🇷🇴', entity:'SRL', estDays:10, roof:5, office:'Oficiul Național al Registrului Comerțului (ONRC), București', bs:'plaster', wc:'#cfe0d8', rc:['#8a5a48','#6e4638'], src:[["ONRC", "https://www.onrc.ro"], ["Law 239/2025 - capital minimum returns", "https://lexter.ro/blog/srl-share-capital-2026-law-239-onrc"]],
  tag:"Registration is 100% free by law — so everyone pays a consultant, because the free procedure runs on Romanian-only templates and a qualified e-signature. The registered office where 'no activity takes place' is.",
  steps:[
    { who:'ONRC — ghișeul de nume', lines:[
      {t:"Rezervarea numelui: gratuită! Prin Legea 1/2017 am eliminat toate taxele. Rezervarea e valabilă o lună.", s:"Name reservation: free! Law 1/2017 abolished all the fees. The reservation is valid for one month."},
      {t:"Dacă nu terminați totul într-o lună — de la capăt. Gratuit, desigur. La nesfârșit, dacă e nevoie.", s:"If you don't finish everything within a month — start over. Free, of course. Endlessly, if necessary."} ],
      wait:2, doc:'Rezervare denumire' },
    { who:'Sediul social', lines:[
      {t:"Pentru sediul într-un bloc de locuințe vă trebuie acordul vecinilor. SAU declarați că 'la sediul social nu se desfășoară activitate'.", s:"For a registered office in an apartment building you need the neighbours' consent. OR you declare that 'no activity takes place at the registered office'."},
      {t:"Toată lumea declară asta. Sediul unde nu se întâmplă nimic —.", s:"Everyone declares that. The office where nothing happens —."} ],
      cost:100, san:4, doc:'Contract de comodat' },
    { who:'ONRC — dosarul', lines:[
      {t:"Depunerea e gratuită — dar formularele sunt în română și cer semnătură electronică calificată. De aceea toată lumea plătește un consultant pentru procedura gratuită.", s:"Filing is free — but the forms are in Romanian and require a qualified e-signature. Which is why everyone pays a consultant for the free procedure."},
      {t:"ONRC vă extrage singur cazierul fiscal de la ANAF. Apoi semnați declarații despre fapte pe care statul deja le știe. ...Dosarul e complet. Înregistrat!", s:"The registry pulls your fiscal record from the tax agency itself. Then you sign declarations about facts the state already knows. ...The dossier is complete. Registered!"} ],
      cost:200, wait:3, san:4, doc:'Certificat de înregistrare' },
    { who:'ANAF — SPV', lines:[
      {t:"Înscrieți-vă în Spațiul Privat Virtual. Din 2024, orice factură B2B trece OBLIGATORIU prin platforma statului: e-Factura.", s:"Enrol in the state's Virtual Private Space. Since 2024, every B2B invoice MUST pass through the state platform: e-Factura."},
      {t:"O factură trimisă pe orice altă cale, fiscal vorbind, nu există. Bine ați venit în România digitală!", s:"An invoice sent any other way, fiscally speaking, does not exist. Welcome to digital Romania!"} ],
      wait:3, doc:'Cont SPV + e-Factura' } ] },

{ id:'sk', name:'Slovakia', flag:'🇸🇰', entity:'s.r.o.', estDays:14, roof:6, office:'Obchodný register SR, Bratislava', bs:'plaster', wc:'#dfe8c8', rc:['#8a5a48','#6e4638'], src:[["Court fee 220 euro since 4/2024", "https://www.podnikajte.sk/obchodne-pravo/zvysenie-sudnych-a-spravnych-poplatkov-od-1-4-2024"], ["slovensko.sk e-filing", "https://www.slovensko.sk"]],
  tag:"A foreigner must submit a notarized declaration about a Slovak tax file that doesn't exist. The €5,000 capital is 'deposited' into the company cash box — a drawer — proven by a note you write yourself.",
  steps:[
    { who:'Daňový úrad', lines:[
      {t:"Najprv: súhlas správcu dane — potvrdenie, že nedlhujete slovenské dane. Nikdy ste tu nepodnikali? Presne tak. Dokážte to.", s:"First: the tax administrator's clearance — confirmation you owe no Slovak taxes. You've never done business here? Exactly. Prove it."},
      {t:"Cudzinci prikladajú notársky overené vyhlásenie o daňovom spise, ktorý neexistuje. Mimochodom: dlh nad €170 blokuje založenie. €171 — problém. €169 — nech sa páči.", s:"Foreigners attach a notarized declaration about a tax file that does not exist. By the way: debt over €170 blocks the founding. €171 — a problem. €169 — go right ahead."} ],
      wait:6, san:8, doc:'Vyhlásenie o neexistujúcom spise' },
    { who:'Matrika', lines:[
      {t:"Overenie podpisov: dve eurá za podpis. Najlacnejšia časť celého procesu. Vychutnajte si ju.", s:"Signature certification: two euros per signature. The cheapest part of the whole process. Savor it."} ],
      cost:8, doc:'Overené podpisy' },
    { who:'Správca vkladu', lines:[
      {t:"Základné imanie €5.000 'splatíte' do pokladnice spoločnosti. Pokladnica je zásuvka. Dôkazom je vaše vlastné písomné vyhlásenie. Nikto nič neoverí.", s:"You 'pay' the €5,000 capital into the company's cash box. The cash box is a drawer. The proof is your own written declaration. Nobody verifies anything."} ],
      capital:5000, san:5, doc:'Vyhlásenie správcu vkladu' },
    { who:'Notár (registrátor)', lines:[
      {t:"Zápis do registra je od roku 2020 výlučne elektronický — so slovenským eID, ktoré cudzinci nemajú. Preto idete cez notára: €204,06 a zapíšem vás na počkanie.", s:"Registration has been electronic-only since 2020 — with a Slovak eID that foreigners don't have. Hence the notary: €204.06 and I register you while you wait."},
      {t:"Súdny poplatok medzitým potichu stúpol zo €150 na €220. Nikto si nevšimol. Vitajte na Slovensku — skúste halušky.", s:"The court fee, meanwhile, quietly rose from €150 to €220. Nobody noticed. Welcome to Slovakia — try the halušky."} ],
      cost:204, wait:4, doc:'Výpis z obchodného registra' } ] },

{ id:'si', name:'Slovenia', flag:'🇸🇮', entity:'d.o.o.', estDays:14, roof:7, office:'AJPES — Poslovni register Slovenije, Ljubljana', bs:'alpine', wc:'#f2ede2', rc:['#7a6a58','#5e5044'], src:[["SPOT - free d.o.o. registration", "https://spot.gov.si/en/info/company-registration/limited-liability-company-d-o-o"], ["Director minimum contributions", "https://mladipodjetnik.si"]],
  tag:"Registration: genuinely free. The ticket to the 'fully online' system: a paper form, an in-person certificate, €7,500 frozen in advance — and €858/month in contributions before you earn a euro.",
  steps:[
    { who:'FURS', lines:[
      {t:"Najprej davčna številka za vsakega družbenika — na PAPIRNATEM obrazcu DR-04. Registracija je sicer 'popolnoma spletna'.", s:"First a tax number for every founder — on PAPER form DR-04. The registration itself is otherwise 'fully online'."},
      {t:"Vstopnica v splet je iz papirja.", s:"The ticket to the online world is made of paper."} ],
      wait:3, doc:'Davčna številka' },
    { who:'Overitev soglasja', lines:[
      {t:"Lastnik vašega poslovnega naslova mora podpisati soglasje — overjeno pri notarju ali na upravni enoti. Brez overjenega pisma ni podjetja.", s:"The owner of your business address must sign a consent — certified at a notary or the administrative unit. No certified letter, no company."} ],
      cost:10, doc:'Soglasje lastnika' },
    { who:'Banka', lines:[
      {t:"Celotnih €7.500 osnovnega kapitala vplačate VNAPREJ na začasni račun. Tam zamrznjeni čakajo na vpis v register.", s:"The entire €7,500 share capital is deposited IN ADVANCE into a temporary account. It waits there, frozen, for the registration."} ],
      capital:7500, wait:3, doc:'Potrdilo o vplačilu' },
    { who:'Točka SPOT', lines:[
      {t:"Registracija: brezplačna. Nič evrov. Slovenija bi rada poudarila, da Nemčija zaračuna €800, da notar bere na glas. Mi tega... preprosto ne počnemo.", s:"Registration: free. Zero euros. Slovenia would like to note that Germany charges €800 for a notary to read aloud. We simply... don't do that."},
      {t:"Vloženo. Vmes pojdite na lep pohod — gore so tudi brezplačne.", s:"Filed. Meanwhile, take a nice hike — the mountains are also free."} ],
      wait:4, doc:'Vpis v register' },
    { who:'AJPES + ZZZS', lines:[
      {t:"Dejanske lastnike vpišite v 8 dneh. In majhen detajl: edini družbenik-direktor brez druge zaposlitve plačuje minimalne prispevke — okoli €858 na mesec.", s:"File your beneficial owners within 8 days. And one small detail: a sole shareholder-director without other employment pays minimum contributions — about €858 a month."},
      {t:"Preden zaslužite prvi evro. Dobrodošli v Sloveniji!", s:"Before you earn your first euro. Welcome to Slovenia!"} ],
      cost:858, wait:2, san:10, doc:'Vpis AJPES' } ] },

{ id:'es', name:'Spain', flag:'🇪🇸', entity:'S.L.', estDays:40, roof:0, office:'Registro Mercantil de Madrid', bs:'medit', wc:'#eabf8e', rc:['#c0563a','#96422c'], src:[["Registradores de Espana", "https://www.registradores.org"], ["RETA for administrators", "https://www.infoautonomos.com/seguridad-social/cuota-autonomos-societarios/"]],
  tag:"NIE appointments are scalped by bots at midnight; the physical queue starts at 6 AM. You'll file a mandatory tax return for €0, and the late registrar's penalty is a discount on his own fee. RETA: ~€315/month, even unpaid.",
  steps:[
    { who:'Extranjería', queue:'VENTANILLA ÚNICA', lines:[
      {t:"Necesita un NIE — el número de identidad de extranjero. Las citas se publican a medianoche en la web. A las 00:01 ya no quedan: los bots las revenden.", s:"You need an NIE — the foreigner identification number. Appointments are released at midnight on the website. By 00:01 they're gone: bots scalp them."},
      {t:"La cola física empieza a las seis de la mañana. Traiga agua. Traiga un libro. Traiga determinación.", s:"The physical queue starts at six in the morning. Bring water. Bring a book. Bring resolve."} ],
      wait:15, san:12, doc:'NIE' },
    { who:'Registro Mercantil Central', lines:[
      {t:"Proponga CINCO nombres, por orden de esperanza. Rechazaremos los cuatro buenos y aprobaremos el quinto.", s:"Propose FIVE names, in descending order of hope. We shall reject the four good ones and approve the fifth."},
      {t:"El certificado vale tres meses; la reserva, seis. Sí: renovará el papel de su propio nombre.", s:"The certificate is valid three months; the reservation, six. Yes: you will renew the paperwork for your own name."} ],
      cost:25, wait:5, san:5, doc:'Certificación negativa' },
    { who:'Banco', lines:[
      {t:"Cuenta 'en constitución', depósito de €3.000. El certificado se imprime en papel de gramaje ceremonial.", s:"An 'in formation' account, €3,000 deposit. The certificate is printed on paper of ceremonial weight."} ],
      capital:3000, wait:3, doc:'Certificado de depósito' },
    { who:'Notario Sr. García',
      bounce:{ to:0,
        lines:[ {t:"La escritura... un momento. Necesito una copia COMPULSADA de su NIE. Esto es una copia normal. Vuelva a Extranjería.", s:"The escritura... one moment. I need a CERTIFIED copy of your NIE. This is a normal copy. Return to the foreigners' office."} ],
        visitLines:[ {t:"¿Otra vez usted? Coja número. El 848. ...Su copia compulsada. Salude al notario de mi parte.", s:"You again? Take a number. 848. ...Your certified copy. Greet the notary for me."} ],
        doc:'NIE (copia compulsada)', san:8,
        nag:{t:"Sin la copia compulsada no hay escritura. El sello de la fotocopia es tan importante como la fotocopia. Quizá más.", s:"Without the certified copy there is no deed. The stamp on the photocopy matters as much as the photocopy. Perhaps more."} },
      lines:[
      {t:"¡La escritura pública! Leemos, usted firma, sellamos. España funciona con sellos, aceite de oliva y cenas tardías.", s:"The public deed! We read, you sign, we stamp. Spain runs on stamps, olive oil and late dinners."},
      {t:"Después presente el modelo 600: un impuesto EXENTO que aun así debe declararse. Una declaración de cero euros, obligatoria, en 30 días hábiles.", s:"Afterwards, file form 600: a tax that is EXEMPT but must still be declared. A mandatory zero-euro tax return, within 30 working days."} ],
      cost:500, wait:4, doc:'Escritura pública' },
    { who:'Registro Mercantil', lines:[
      {t:"El registrador tiene 15 días para inscribirle. Si se retrasa, su sanción es... un descuento del 30% en su propia tarifa.", s:"The registrar has 15 days to register you. If he is late, his penalty is... a 30% discount on his own fee."},
      {t:"Inscrita. Y ahora, el RETA: unos €315 al mes de autónomos por administrar su empresa. Aunque no cobre nada. ¡Enhorabuena! Échese una siesta. La ha ganado.", s:"Registered. And now, RETA: about €315 a month in self-employed contributions for managing your company. Even if you pay yourself nothing. Congratulations! Take a nap. You've earned it."} ],
      cost:565, wait:8, san:6, doc:'Inscripción registral' } ] },

{ id:'se', name:'Sweden', flag:'🇸🇪', entity:'AB', estDays:20, roof:1, office:'Bolagsverket, Sundsvall', bs:'nordic', wc:'#9e3f2f', rc:['#3a3a40','#2a2a30'], src:[["Bolagsverket - avgifter", "https://www.bolagsverket.se/sjalvservice/avgifter"], ["Bolagsverket", "https://www.bolagsverket.se"]],
  tag:"A bank certificate for a company that doesn't exist, issued only to existing BankID customers, which requires a personnummer. Applications processed strictly in order — NO priority for anyone. This is Sweden.",
  steps:[
    { who:'BankID-disken', lines:[
      {t:"Allt sker digitalt med BankID. BankID kräver personnummer — och att man redan är kund i en svensk bank.", s:"Everything is digital with BankID. BankID requires a personal number — and already being a customer of a Swedish bank."},
      {t:"En enda utländsk styrelseledamot utan e-legitimation? Då går HELA ansökan på papper. Halva styrelsen måste för övrigt bo inom EES.", s:"A single foreign board member without e-ID? Then the WHOLE filing goes to paper. Half the board must, incidentally, reside in the EEA."} ],
      wait:4, san:5, doc:'BankID' },
    { who:'Banken', lines:[
      {t:"Ett bankintyg för ett bolag 'under bildande' — ett konto för ett bolag som inte finns. 25.000 kronor, tack.", s:"A bank certificate for a company 'under formation' — an account for a company that does not exist. SEK 25,000, please."} ],
      capital:2250, wait:3, doc:'Bankintyg' },
    { who:'Bolagsverket', lines:[
      {t:"Avgift: 2.400 kronor. Vi sänkte kapitalkravet för att hjälpa grundare — och höjde sedan registreringsavgiften med 26 procent.", s:"Fee: SEK 2,400. We lowered the capital requirement to help founders — then raised the registration fee by 26 percent."},
      {t:"Ärenden behandlas strikt i turordning. Vi ger INGA ärenden förtur. Alla väntar lika länge. Detta är Sverige. ...Ert AB är registrerat. Njut av känslan, med måtta.", s:"Cases are processed strictly in order of arrival. We give NO case priority. Everyone waits equally long. This is Sweden. ...Your AB is registered. Enjoy the feeling, in moderation."} ],
      cost:215, wait:11, doc:'Registreringsbevis' },
    { who:'Verklig huvudman', lines:[
      {t:"Anmäl verklig huvudman inom fyra veckor: 250 kronor. E-tjänsten är obligatorisk enligt lag.", s:"File your beneficial owner within four weeks: SEK 250. The e-service is mandatory by law."},
      {t:"Vill ni använda papper måste ni först ansöka om dispens.", s:"To use paper, you must first apply for an exemption."} ],
      cost:22, wait:2, san:4, doc:'Verklig huvudman' } ] },
];

/* precomputed estimates (fees exclude locked capital) */
const FAKE = { vars:{ de:'GmbH' } };
for(const c of COUNTRIES){
  let fees=0, cap=0;
  for(const s of c.steps){
    if(s.cost) fees += (typeof s.cost==='function'? s.cost(FAKE): s.cost);
    if(s.capital) cap += (typeof s.capital==='function'? s.capital(FAKE): s.capital);
  }
  c.estFees=fees; c.estCap=cap;
  c.rating = c.estDays<=1?1 : c.estDays<=7?2 : c.estDays<=21?3 : c.estDays<=45?4 : 5;
}
const CINDEX = {}; COUNTRIES.forEach((c,i)=>CINDEX[c.id]=i);

const WAIT_EVENTS = [
  {d:3, t:"📮 A letter: one photocopy was not certified. Resubmit. +3 days."},
  {d:5, t:"📮 The clerk handling your file is on holiday. +5 days."},
  {d:2, t:"📮 The office moved buildings. Your file did not. +2 days."},
  {d:4, t:"📮 Public-sector strike. +4 days."},
  {d:2, c:60, t:"📮 'Administrative surcharge': €60. No explanation. +2 days."},
  {d:3, t:"📮 Your form was fine. The form ABOUT your form was missing. +3 days."},
];
const WAIT_THOUGHTS = [
  "You refresh your inbox. Nothing.",
  "Your competitor shipped v2. You have a folder.",
  "You could have built the MVP by now. Twice.",
  "The office plant died. You water the paperwork instead.",
  "Somewhere in Delaware, someone incorporated during a coffee break.",
  "You practice saying 'we're basically incorporated' convincingly.",
  "Your mom asks if the company exists yet. Complicated question.",
  "You dream in triplicate.",
  "A pigeon outside has founded three companies in this time.",
];
