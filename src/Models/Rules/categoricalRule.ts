import {Attribute, Instance} from '../';

export class CategoricalRule {

    private _attribute: Attribute;
    private _condition: string;
    private  _splitMap: Map<string, Array<Instance>>;

    constructor(attribute: Attribute, condition: string) {
        this._attribute = attribute;
        this._condition = condition;
        this._splitMap = new Map<string, Array<Instance>>();
        this._attribute.uniqueValues.forEach((value) => {
            this._splitMap.set(value.toString(), new Array<Instance>());
        });
    }

    public split(list: Array<Instance>): Map<string, Array<Instance>> {
        list.forEach((instance) => {
            const value = instance.getAttributeValue(this._attribute.name).toString();
            this._splitMap.get(value).push(instance);
        });
        return this._splitMap;
    }

    public print(): string {
        const prepend = (this._condition) ? `Condition: ${this._condition}, ` : ``;
        return `${prepend}Split on Categorical Attribute: ${this._attribute.name}`;
    }
}
