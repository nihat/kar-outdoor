export class Product {

  constructor(public sku?: string,
              public name?: string,
              public description?: string,
              public unitPrice?: number,
              public active?: boolean,
              public stockCount?: number,
              public categoryId?: number,
              public imageUrl?: string,
              public createdDate?: Date,
              public updateDate?: Date) {
  }
}
