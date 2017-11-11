import {Rule} from '../';

export class DecisionTree {

    private _rule: Rule;
    private _children: Array<DecisionTree>;
    private _parent: DecisionTree;

    constructor(rule?: Rule, children?: Array<DecisionTree>, parent?: DecisionTree) {
        this._rule = rule || null;
        this._children = children || new Array<DecisionTree>();
        this._parent = parent || null;
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

    public addChild(child: DecisionTree ) {
        this._children.push(child);
    }

    public get parent(): DecisionTree {
        return this._parent;
    }

    public set parent(parent: DecisionTree) {
        this._parent = parent;
    }

    public height(root: DecisionTree = this): number {
        let subHeights = new Array<number>();
        if (root === null) {
            return 0;
        }
        root.children.forEach((child) => {
            subHeights.push(child.height());
        });
        return (subHeights.sort().pop() || 0) + 1;
    }

    public print(level: number = 0) {
        let prepend: string = '';
        for (let i = 0; i < level; i++) {
            prepend += '------';
        }
        console.log(prepend + (this._rule.print()));
        this.children.forEach((child) => {
            child.print(level + 1);
        });
    }

}
