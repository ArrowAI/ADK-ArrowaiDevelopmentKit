export class ChatComponentModuleConfig {
	public defaults: any = [
		{
			id: 1,
			title: 'Quiz',
			icon: 'flaticon-questions-circular-button',
			description: " Better Customer Engagement By Quiz",
			url: '',
			element: ``
		},
		{
			id: 2,
			title: 'Poll',
			icon: 'flaticon2-digital-marketing',
			description: " Better Customer Engagement By Poll",
			url: '',
			element: ``
		}
	];
	public get configs(): any {
		return this.defaults;
	}
}
