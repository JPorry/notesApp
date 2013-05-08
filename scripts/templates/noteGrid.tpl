<h1 class="note-title  {{#if tasks}}list{{/if}}">{{title}}</h1>
{{#if text}}
<p class="text">{{{nl2br text}}}</p>
{{/if}}
{{#if tasks}}
	<ul>
		{{#each_upto tasks 4}}
		<li class="task {{#done}}done{{/done}}">
			<p class="task-text">{{{nl2br title}}}</p>
		</li>
		{{/each_upto}}
	</ul>
{{/if}}
<p class="date">{{dateformat creationDate}}</p>