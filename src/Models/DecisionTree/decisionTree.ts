import {CategoricalRule, Instance, NumericRule, PredictionRule, Rule} from '../';

export class DecisionTree {

    private _rule: Rule;
    private _children: Array<DecisionTree>;
    private _parent: DecisionTree;
    private _numCorrect: number;

    constructor(rule?: Rule, children?: Array<DecisionTree>, parent?: DecisionTree) {
        this._rule = rule || null;
        this._children = children || new Array<DecisionTree>();
        this._parent = parent || null;
        this._numCorrect = 0;
    }

    /**
     * Add Child to the Decision Tree
     *
     * @param {DecisionTree} child The Child
     *
     */
    public addChild(child: DecisionTree): void {
        this._children.push(child);
    }

    /**
     * Get the Height of the DEcision Tree
     *
     * @param {DecisionTree} root The decision tree you are calculating the height of
     * @returns {number} The height
     *
     */
    public height(root: DecisionTree = this): number {
        let subHeights: Array<number> = new Array<number>();
        if (root === null) {
            return 0;
        }
        root.children.forEach((child: DecisionTree) => {
            subHeights.push(child.height());
        });
        return (subHeights.sort().pop() || 0) + 1;
    }

    /**
     * Get a String Representation of the Decision Tree
     *
     * @param {number} level The level of the tree
     * @returns {string} String representation of the tree
     *
     */
    public print(level: number = 0): string {
        let prepend: string = '';
        let output: string = '';
        for (let i = 0; i < level; i++) {
            prepend += '------';
        }
        output += ('\n\r' + prepend + this._rule.print());
        this.children.forEach((child: DecisionTree) => {
            output += child.print(level + 1);
        });
        return output;
    }

    /**
     * Classify an Instance
     *
     * @param {Instance} instance Instance to classify
     * @returns {string} Predicted classification
     *
     */
    public classify(instance: Instance): string {
        if (this._rule instanceof PredictionRule) {
            if (this._rule.classify(instance)) {
                this._numCorrect++;
            }
            return this._rule.label;
        } else if (this._rule instanceof NumericRule) {
            const nextChild = this._rule.classify(instance);
            return this._children[nextChild].classify(instance);
        } else if (this._rule instanceof CategoricalRule) {
            const value  = instance.getAttributeValue(this._rule.attribute.name);
            const desiredChild = this._children.find((child) => {
                return child._rule.condition === value;
            });
            return desiredChild.classify(instance);
        }
    }

    /**
     * Recursive Algorithm to Report the Number of Instances the Tree Classified Correctly
     *
     * @param {DecisionTree} root Root of the decision tree
     * @param {Array<number>} numCorrect Array to keep track of correct classifications
     * @returns {number} Total correct classifications
     *
     */
    public report(root: DecisionTree = this, numCorrect: Array<number> = []): number {
        numCorrect.push(this._numCorrect);
        if (root.children) {
            root.children.forEach((child: DecisionTree) => {
                return child.report(child, numCorrect);
            });
        }
        this._numCorrect = 0;
        return numCorrect.reduce((sum: number, value: number) => {
            return sum + value;
        });
    }

    public get rule(): Rule {
        return this._rule;
    }

    public set rule(rule: Rule) {
        this._rule = rule;
    }

    public get children(): Array<DecisionTree> {
        return this._children;
    }

    public set children(children: Array<DecisionTree>) {
        this._children = children;
    }

    public get parent(): DecisionTree {
        return this._parent;
    }

    public set parent(parent: DecisionTree) {
        this._parent = parent;
    }

    public get numCorrect(): number {
        return this._numCorrect;
    }

}
