export class ChatModuleConfig {
	public defaults: any = [{
		id: 1,
		title: 'Fresh Desk',
		icon: 'flaticon2-graphic-1',
		description: "Manage your Tickets",
		url:''
	},
	{
		id: 2,
		title: 'Ticketing',
		icon: 'flaticon-open-box',
		description: "Manage tickets Raised by user ",
		url:''
	}
	];
	public get configs(): any {
		return this.defaults;
	}
}
