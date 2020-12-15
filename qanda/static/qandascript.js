function addSection(ul,question_author,question,answer_author,answer,id){
	let li_faqcontainer = document.createElement("li");
	li_faqcontainer.setAttribute("id",id);
	li_faqcontainer.setAttribute("class","qandabox");

	let li_question = document.createElement("li");
	li_question.setAttribute("class","question");
	li_question.appendChild(document.createTextNode(question));
	li_faqcontainer.appendChild(li_question);

	let li_question_author = document.createElement("li");
	li_question_author.setAttribute("class","question_author");
	li_question_author.appendChild(document.createTextNode("-"+question_author));
	li_faqcontainer.appendChild(li_question_author);

	let li_answer_container = document.createElement("li");
	li_faqcontainer.appendChild(li_answer_container);

	let ul_answer_container = document.createElement("ul");
	li_answer_container.appendChild(ul_answer_container);

	let li_answer = document.createElement("li");
	li_answer.setAttribute("class","answer");
	li_answer.appendChild(document.createTextNode(answer));
	ul_answer_container.appendChild(li_answer);

	let li_answer_author = document.createElement("li");
	li_answer_author.setAttribute("class","answer_author");
	li_answer_author.appendChild(document.createTextNode("-"+answer_author));
	ul_answer_container.appendChild(li_answer_author);

	let hr = document.createElement("hr");
	li_faqcontainer.appendChild(hr);

	ul.appendChild(li_faqcontainer);
}

async function loadQAndA(){//function used to retrieve from the server the entire faq list
		return await fetch("../api/v2/qanda")
		.then((resp)=>resp.json())
		.then(function(data){
				//console.log(data);
				let faqcontainer=document.getElementById("faqcontainer");
			data.forEach((item, i) => {
			if (!item.answerText)
				item.answerText="An admin is reviewing this question.";
				addSection(faqcontainer,item.questionAuthor,item.questionText,item.answerAuthor,item.answerText,item.id)
		});
		})
	}


function sendQuestion(email,name,surname,text) {
	let username=name+" "+surname;
	if(email){
		username+=" ("+email+")";
	}
		return fetch('./api/v2/qanda',{
			method:'post',
			headers: {
			 'Content-Type': 'application/json'
		 },
		 body:JSON.stringify({questionAuthor:username,questionText:text,answerAuthor:"",answerText:""})
	 })
	 .then((resp) => resp.json())
	 .then((res)=>{
		 alert(res.message);
	 })
	 .catch( error => console.error(error) );

}

function askQuestion() {
	let email=document.getElementById("email_field");
	let name=document.getElementById("name_field");
	let surname=document.getElementById("surname_field");
	let question=document.getElementById("question_field");
	if(!(email.value || name.value || surname.value) || !question.value){
		alert("check fields");
	}else{
		sendQuestion(email.value,name.value,surname.value,question.value);
	}
}
loadQAndA();
