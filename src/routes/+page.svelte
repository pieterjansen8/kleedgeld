<script lang="ts">
    import { Button, Spinner , Card, Input, Alert } from 'flowbite-svelte';
    let loading = $state(false)
    let code = $state("") 
    let loggedIn = $state(false)
    let status = $state("")
    let kleedgeld = [ 
        { 
            name: "pieter", 
            geld: "€300",
            last_change: "1/04/2025"
        },
        {
            name: "lex", 
            geld: "€300",
            last_change: "1/04/2025"
        }
    ]
    async function login(){
        const f = await fetch("/api/login", { 
            method:"POST",
            body: JSON.stringify({ 
                 code: code
            })
        })
        loading=false
        if(await f.json()==true){
            loggedIn=true
        }
        else{
            status = "Error: foute code."
        }
    }
</script>

{#if loggedIn===false}
    <div class="flex-col w-screen h-screen flex justify-center items-center ">
        <Card class="max-w-10/12 sm:max-w-1/2 space-y-5">
            <span class=" text-xl sm:text-2xl">Generieke login code: </span>
            <Input type="password" bind:value={code} class=" dark:focus:ring-gray-100 dark:focus:border-gray-100"></Input>
            {#if loading==true}
                <Button    color="light" pill disabled>
                    <Spinner color="gray"/>
                </Button>    
            {:else}
                <Button onclick={ async () => {loading=true;await login();}} class="cursor-pointer" color="light" pill >login</Button>
                <span class="text-red-500">{status}</span>
            {/if}
        </Card>
    </div>
    {:else if loggedIn===true}
    <div class="w-screen h-screen space-y-5 flex flex-col sm:flex-row justify-center items-center  sm:space-x-5 sm:space-y-0">
        {#each kleedgeld as titels }
            <Card class="sm:max-w-5/12">
                <span class="text-2xl">{titels.name}</span>
                <span class="sm:text-xl text-lg">kleedgeld-saldo: {titels.geld}</span>
                <span>laast aangepast: {titels.last_change}</span>
            </Card>
        {/each}
    </div>
{/if}
