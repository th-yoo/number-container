import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/input/input.js';

import { LitElement, css, html } from 'lit'
import { customElement, property} from 'lit/decorators.js'
import { numberContext } from './number-context';
import { provide } from '@lit/context';

@customElement('sl-num-container')
export class NumberContainer extends LitElement {
	// styling slot
	// https://stackoverflow.com/questions/61626493/slotted-css-selector-for-nested-children-in-shadowdom-slot/61631668#61631668
	
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			gap: 8px;
			height: 200px;
			padding: 8px;
			border: solid 1px gray;
		}

		/* locate label on left side */
		sl-input::part(form-control) {
			display: grid;
			grid: auto / 3.75rem 1fr;
			gap: var(--sl-spacing-3x-small) 1rem;
			align-items: center;
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
			<sl-input label="Value:" @sl-change="${this._onChange}" value="${this.value}"></sl-input>
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
