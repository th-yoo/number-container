import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { numberContext } from './number-context';
import { consume } from '@lit/context';

@customElement('x-display')
export class XDisplay extends LitElement {
	static styles = css`
		:host {
			display: inline-block;
			color: white;
			min-width: 80px;
			padding: 8px;
		}
	`;

	@consume({context: numberContext, subscribe: true})
	@property({attribute: false})
	value?: number;

	@property()
	color = 'blue';

	constructor()
	{
		super();
		this.addEventListener('dragstart', this._onDragStart);
		this.draggable = true;
	}

	// debug
	updated(changedProperties: Map<string, any>)
	{
		console.log(`updated ${this.value}`);
		console.log(changedProperties);
		if (changedProperties.has('value')) {
			console.log(`value is updated: ${this.value}`);
		}
	}

	render()
	{
		return html`
			<style>
				:host { background: ${this.color} }
			</style>
			<p>Value: ${this.value}</p>
		`;
	}

	_onDragStart(e: DragEvent)
	{
		e.dataTransfer!.dropEffect = "move";
		(window as any).draggedElement = this;
	}
}
