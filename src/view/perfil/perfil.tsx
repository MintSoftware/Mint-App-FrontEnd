// import { Input } from "@/components/ui/input"
// import { perfilViewModel } from "./perfilViewModel"

// export default function Perfil() {

//     const {
//         activeTab,
//         setActiveTab,
//         usuario,
//         listaEnderecos,
//         nomeEndereco,
//         setNomeEndereco,
//         cep,
//         setCep,
//         rua,
//         setRua,
//         numero,
//         setNumero,
//         complemento,
//         setComplemento,
//         bairro,
//         setBairro,
//         cidade,
//         setCidade,
//         estado,
//         setEstado,
//         enderecoSelecionado,
//         setEnderecoSelecionado,
//         nome,
//         setNome,
//         senha,
//         setSenha,
//         email,
//         setEmail,
//         cpfcnpjFormatado,
//         setCpfCnpjFormatado,
//         telefone,
//         setTelefone,
//         dataNascimento,
//         setDataNascimento,
//         sobrenome,
//         setSobrenome,
//         formatarTelefone,
//         formatarCfpCnpj,
//         recuperarUsuarioLogado,
//         salvarAlteracoes,
//         cadastrarEndereco,
//         cadastroEndereco
//     } = perfilViewModel();
//     }
    
//     return (
//         <Card className="w-full max-w-lg mt-[10rem]">
//             <CardHeader>
//                 <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
//                     <TabsList className="grid w-full grid-cols-2">
//                         <TabsTrigger value="general">Geral</TabsTrigger>
//                         <TabsTrigger value="address">Endereço</TabsTrigger>
//                     </TabsList>
//                     <TabsContent value="general">
//                         <div className="flex flex-col items-center gap-6">
//                             <div className="rounded-full bg-muted p-1 mt-5">
//                                 <Avatar className="h-24 w-24">
//                                     <AvatarImage src="https://github.com/shadcn.png" />
//                                     <AvatarFallback>JP</AvatarFallback>
//                                 </Avatar>
//                             </div>
//                             <CardContent className="grid gap-6">
//                                 <div className="grid gap-4">
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div className="grid gap-2">
//                                             <Label htmlFor="nome">Nome</Label>
//                                             <Input value={nome} id="nome" placeholder="José" required onChange={(e) => setNome(e.target.value)} />
//                                         </div>
//                                         <div className="grid gap-2">
//                                             <Label htmlFor="sobrenome">Sobrenome</Label>
//                                             <Input value={sobrenome} id="sobrenome" placeholder="Silva" required onChange={(e) => setSobrenome(e.target.value)} />
//                                         </div>
//                                     </div>
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div className="grid gap-2">
//                                             <Label htmlFor="email">Email</Label>
//                                             <Input value={email} id="email" placeholder="jose.silva@mintecommerce.com.br" required type="email" onChange={(e) => setEmail(e.target.value)} />
//                                         </div>
//                                         <div className="grid gap-2">
//                                             <Label htmlFor="senha">Senha</Label>
//                                             <Input value={senha} id="senha" required type="password" onChange={(e) => setSenha(e.target.value)} />
//                                         </div>
//                                     </div>
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div className="grid gap-2">
//                                             <Label htmlFor="data-nascimento">Data de Nascimento</Label>
//                                             <Input value={dataNascimento} id="data-nascimento" placeholder="dd/mm/aaaa" required type="date" onChange={(e) => setDataNascimento(e.target.value)} />
//                                         </div>
//                                         <div className="grid gap-2">
//                                             <Label htmlFor="cpf">CPF/CNPJ</Label>
//                                             <Input id="cpf" placeholder="000.000.000-00" required onChange={formatarCfpCnpj} value={cpfcnpjFormatado} />
//                                         </div>
//                                     </div>
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div className="grid gap-2">
//                                             <Label htmlFor="telefone">Telefone</Label>
//                                             <Input value={telefone} id="telefone" placeholder="(00) 00000-0000" required onChange={formatarTelefone} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </div>
//                     </TabsContent>
//                     <TabsContent value="address">
//                         <CardContent className="flex flex-col justify-center">
//                             <div className="grid grid-cols-2 gap-4 pt-4">
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="nome">Nome</Label>
//                                     <Input value={nomeEndereco} id="nome" placeholder="Casa, trabalho..." required onChange={(e) => setNomeEndereco(e.target.value)} />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="cep">CEP</Label>
//                                     <Input value={cep} id="cep" placeholder="00000-000" required onChange={(e) => setCep(e.target.value)} />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="rua">Rua</Label>
//                                     <Input value={rua} id="rua" placeholder="Rua" required onChange={(e) => setRua(e.target.value)} />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="numero">Número</Label>
//                                     <Input value={numero} id="numero" placeholder="Número" required onChange={(e) => setNumero(e.target.value)} />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="complemento">Complemento</Label>
//                                     <Input value={complemento} id="complemento" placeholder="Apartamento, Casa, etc." onChange={(e) => setComplemento(e.target.value)} />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="bairro">Bairro</Label>
//                                     <Input value={bairro} id="bairro" placeholder="Seu bairro" required onChange={(e) => setBairro(e.target.value)} />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="cidade">Cidade</Label>
//                                     <Input value={cidade} id="cidade" placeholder="Sua cidade" required onChange={(e) => setCidade(e.target.value)} />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="estado">Estado</Label>
//                                     <Input value={estado} id="estado" placeholder="Seu estado" required onChange={(e) => setEstado(e.target.value)} />
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </TabsContent>
//                 </Tabs>
//             </CardHeader>
//             <CardFooter className="flex justify-end">
//                 <Button onClick={salvarAlteracoes}>Salvar</Button>
//                 <Link className="ml-3" to="/menuInicial">{" "} Voltar</Link>
//             </CardFooter>
            
//         </Card>
//     )
// }
