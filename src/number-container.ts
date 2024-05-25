import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { numberContext } from './number-context';
import { provide } from '@lit/context';

@customElement('number-container')
export class NumberContainer extends LitElement {
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			gap: 8px;
			height: 200px;
			padding: 8px;
			border: solid 1px gray;
		}
	`;

	@provide({context: numberContext})
	@property({attribute: false})
	value: number = 0;

	constructor()
	{
		super();
		this.addEventListener('dragover', this._onDragOver);
		this.addEventListener('drop', this._onDrop);
	}

	render()
	{
		return html`
			<p>Value: <input @change="${this._onChange}" value="${this.value}"></p>
			<slot></slot>
		`;
	}

	_onChange(e: Event)
	{
		this.value = Number((e.target as HTMLInputElement).value);
		console.log(this.value);
	}

	_onDragOver(e: DragEvent)
	{
		e.preventDefault();
		e.dataTransfer!.dropEffect = "move";
	}

	_onDrop(e: DragEvent)
	{
		e.preventDefault();
		this.appendChild((window as any).draggedElement);
	}
}
