const { query } = require("express");
const res = require("express/lib/response");
const { GraphQLSchema, GraphQLObjectType, GraphQLBoolean, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = require("graphql");
const Invoice = require("./resources/invoice/invoice.model");


const invoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        item: {
            type: new GraphQLNonNull(GraphQLString)
        },
        qty: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    }
})

const invoiceInputType = new GraphQLInputObjectType({
    name: 'InvoiceInput',
    fields: {
        item: {
            type: new GraphQLNonNull(GraphQLString)
        },
        qty: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    }
})

const rootMutation = new GraphQLObjectType ({
    name: 'Mutation',
    fields: {
        createInvoices: {
            type: invoiceType,
            args: {
                item: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                qty: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (_,args) => {
              const invoice = new Invoice({
                  item: args.item,
                  qty: args.qty
              });

              return Invoice.create({item:invoice.item, qty: invoice.qty})
            }
        },

        deleteInvoice: {
            type: invoiceType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },

            resolve: (_, args) => {
               return Invoice.findByIdAndRemove(args.id)
            }
        },

        upddateInvoice: {
            type: invoiceType,
            args: {
                _id: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                item: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                qty: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },

            resolve: (parent, args) => {
                return Invoice.findByIdAndUpdate(
                    args._id,
                    {
                        $set: {
                            item: args.item,
                            qty: args.qty
                        }
                    },
                    {new: true}
                )
            }
        }
    }
})


const rootQuery = new GraphQLObjectType ({
    name: 'Query',
    fields: {
        invoices: {
            type: new GraphQLList(invoiceType),
            resolve: async () => {
                try {
                    return await Invoice.find();
                } catch (error) {
                    
                }
            }
        },

        invoice: {
           type: invoiceType,
           args: {
               id: {
                   type: new GraphQLNonNull(GraphQLID)
               }
           },
           resolve: async (_,args) => {
               try {
                   return await Invoice.findById(args.id)
               } catch (error) {
                   
               }
           }
        }
    }
})




const graphiqlSchema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})



module.exports = {
    graphiqlSchema
}