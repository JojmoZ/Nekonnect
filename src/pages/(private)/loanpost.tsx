import { useState } from "react";
import { LoanPost } from "../../utils/model/entity/loan-post";
import { LoanPostService } from "@/services/loan-post.service";

let loanPostService = new LoanPostService();

function CreateLoanPostPage() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState(0)
    const [assurance, setAssurance] = useState(0)
    const [interest, setInterest] = useState(0)
    const [postDuration, setPostDuration] = useState(0)

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        const post : LoanPost = {
            title,
            description,
            amount,
            assurance,
            interest,
            postDuration: BigInt(postDuration)
        }

        const response = await loanPostService.createLoanPost(post.title, post.description, post.amount, post.assurance, post.interest, post.postDuration);
        console.log(response);
    }

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleCreate}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" step="0.01" value={amount} onChange={e => setAmount(Number(e.target.value))} required />
                </div>
                <div>
                    <label htmlFor="assurance">Assurance</label>
                    <input type="number" id="assurance" step="0.01" value={assurance} onChange={e => setAssurance(Number(e.target.value))} required />
                </div>
                <div>
                    <label htmlFor="interest">Interest (%)</label>
                    <input type="number" id="interest" step="0.01" value={interest} onChange={e => setInterest(Number(e.target.value))} required />
                </div>
                <div>
                    <label htmlFor="postDuration">Post Duration (seconds)</label>
                    <input type="number" id="postDuration" value={postDuration} onChange={e => setPostDuration(Number(e.target.value))} required />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateLoanPostPage;