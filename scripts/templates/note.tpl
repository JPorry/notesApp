<h1 class="note-title">{{title}}</h1>
{{#if text}}
<p class="text">{{{nl2br text}}}</p>
{{/if}}
{{#if tasks}}
	<ul>
		{{#tasks}}
		<li class="task">
			<input type="checkbox" {{#done}}checked{{/done}}>
			<p class="task-text">{{{nl2br title}}}</p>
			<a href="#" class="delete task"></a>
		</li>
		{{/tasks}}
		<li class="task">
			<input type="checkbox">
			<p class="task-text">Insert task...</p>
			<a href="#" class="delete task"></a>
		</li>
	</ul>
{{/if}}
<p class="date">{{dateformat creationDate}}</p>
<a href="#" class="delete note"></a>
<a href="#" class="pickColor"></a>